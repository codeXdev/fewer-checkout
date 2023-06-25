import { type FewerCheckoutButtonCustomEvent } from 'fewer-checkout-button'
import { type FewerCheckoutStatus, type FewerDismissalStatus, type IAddress, type ITransactionDetails } from 'fewer-checkout-button/dist/types/components/fewer-checkout-button/fewer-checkout-button'

declare global {
  interface HTMLElementEventMap {
    fewerCheckoutSuccess: FewerCheckoutButtonCustomEvent<FewerCheckoutStatus>
    updateOrderOnPaymentsuccess: FewerCheckoutButtonCustomEvent<FewerCheckoutStatus>
    fewerAddressUpdate: FewerCheckoutButtonCustomEvent<IAddress>
    fewerDismissed: FewerCheckoutButtonCustomEvent<FewerDismissalStatus>
    fewerPrePayTrigger: FewerCheckoutButtonCustomEvent<ITransactionDetails>
  }
  const FEWERWC_CONSTANTS: {
    transactionDetailsURL: string
    pluginVersion: string
    extraEvents: string
  }
}

function disableFewerButtons (): void {
  const buttons = document.querySelectorAll('fewer-checkout-button')
  buttons.forEach((button) => {
    button.disabled = true
  })
}

const enableFewerButton = (button: HTMLFewerCheckoutButtonElement): void => {
  if (button.disabled) {
    button.disabled = false
    const checkout = new FewerCheckout(button)
    checkout.registerEventListeners()
    if (checkout.position === 'fewer-product-page') {
      const variationForm = jQuery('form.variations_form')
      variationForm?.on('show_variation', function () {
        button.disabled = false
      })
      variationForm?.on('hide_variation', function () {
        button.disabled = true
      })
    }
  }
}

function enableFewerButtons (): void {
  const buttons = document.querySelectorAll('fewer-checkout-button')
  buttons.forEach(enableFewerButton)
}

document.addEventListener('DOMContentLoaded', function () {
  enableFewerButtons()
  // https://github.com/woocommerce/woocommerce/blob/trunk/plugins/woocommerce/client/legacy/js/frontend/cart-fragments.js#L150
  const documentBody = jQuery(document.body)
  documentBody.on(FEWERWC_CONSTANTS.extraEvents, enableFewerButtons)
  documentBody.on('added_to_cart', () => {
    document.querySelectorAll('.fewer-product-page fewer-checkout-button').forEach(e => { e.remove() })
  })
})

window.onbeforeunload = disableFewerButtons

class FewerCheckout {
  handlingPrePayTrigger = false
  handlingCheckoutPayTrigger = false
  busyUpdatingOrder = false
  receivedSuccess = false
  originPrefix = ''
  checkoutButton!: HTMLFewerCheckoutButtonElement
  buttonId: string | null
  position: string | null
  orderContent: any
  genOrderId?: string
  backendURL: string | null
  pre_existing_order_id?: string
  buttonVersion: string | null

  constructor (button: HTMLFewerCheckoutButtonElement) {
    this.checkoutButton = button
    this.buttonId = this.checkoutButton.getAttribute('ref-id')
    this.position = this.checkoutButton.getAttribute('position')
    this.orderContent = undefined
    this.busyUpdatingOrder = false
    this.receivedSuccess = false
    this.backendURL = FEWERWC_CONSTANTS.transactionDetailsURL
    this.pre_existing_order_id = this.checkoutButton?.getAttribute('checkout-order-id') ?? undefined
    this.buttonVersion = FEWERWC_CONSTANTS.pluginVersion
    this.originPrefix = ''
  }

  registerEventListeners (): void {
    const eventsRegistered = this.checkoutButton.getAttribute('events-registered')
    if (eventsRegistered) {
      return
    }
    const fewerCheckoutSuccess = (ev: FewerCheckoutButtonCustomEvent<FewerCheckoutStatus>): void => {
      this.receivedSuccess = true
      if (this.busyUpdatingOrder) {
        return
      }
      try {
        if (ev.detail.orderId && this.genOrderId) {
          window.location.href = window.location.origin + this.originPrefix + '?fewer_order_created=' + this.genOrderId
        }
      } catch (error: unknown) {
        throw new Error(error?.toString())
      }
    }

    const updateOrderOnPaymentsuccess = (ev: FewerCheckoutButtonCustomEvent<FewerCheckoutStatus>): void => {
      this.busyUpdatingOrder = true
      if (ev.detail.orderId) {
        this.completeOrder()
          .then(() => {
            this.busyUpdatingOrder = false
            if (this.receivedSuccess && this.genOrderId) {
              window.location.href = window.location.origin + this.originPrefix + '?fewer_order_created=' + this.genOrderId
            }
          })
          .catch(err => { throw new Error(err?.toString()) })
      }
    }

    const fewerAddressUpdate = (ev: FewerCheckoutButtonCustomEvent<IAddress>): void => {
      const urlForUpdate = window.location.origin + this.originPrefix + '/wp-json/wc/fewer/v2/checkout/update'
      postData(urlForUpdate, {
        fewer_cart_id: this.buttonId,
        address_details: ev.detail
      })
        .then(async res => await res.json())
        .then(data => {
          this.checkoutButton.setAttribute('discount', data.discount)
          this.checkoutButton.setAttribute('taxes', data.taxes)
          this.checkoutButton.setAttribute('amount', data.amount)
          this.checkoutButton.setAttribute('shipping-methods', JSON.stringify(data.shipping_methods))
          this.checkoutButton.shippingMethods = data.shipping_methods
          this.checkoutButton.dispatchEvent(new Event('fewerAddressAck'))
        })
        .catch(err => { console.log(err) })
    }

    const fewerDismissed = (event: FewerCheckoutButtonCustomEvent<FewerDismissalStatus>): void => {
      if (event.detail.orderId) {
        if (this.genOrderId) {
          this.completeOrder(event.detail.paymentSuccessful)
            .catch(err => { console.log(err) })
        }
        this.checkoutButton.disabled = true
        this.cancelOrder(event.detail.orderId)
          .finally(() => {
            this.checkoutButton.disabled = false
            this.genOrderId = undefined
          })
      }
    }

    const fewerPrePayTrigger = (ev: FewerCheckoutButtonCustomEvent<ITransactionDetails>): void => {
      if (this.handlingPrePayTrigger) return
      this.handlingPrePayTrigger = true
      const url = window.location.origin + this.originPrefix + '/wp-json/wc/fewer/v2/order/create'
      postData(url, {
        fewer_cart_id: this.buttonId,
        transaction_details: ev.detail,
        fewer_order_id: this.pre_existing_order_id
      })
        .then(async res => {
          const data = await res.json()
          if (!res.ok) {
            throw new Error(data)
          }
          return data
        })
        .then(data => {
          this.genOrderId = data.order_id
          this.checkoutButton.setAttribute('amount', data.amount)
          this.checkoutButton.dispatchEvent(new CustomEvent('fewerPrePayTriggerAck', {
            detail: {
              order_total_amount: data.amount,
              order_id: data.order_id
            }
          }))
        }).catch(err => {
          this.checkoutButton.dispatchEvent(new CustomEvent('fewerPrePayTriggerError', {
            detail: {
              description: err?.toString()
            }
          }))
        }).finally(() => {
          this.handlingPrePayTrigger = false
        })
    }

    const fewerPreCheckoutTrigger = (ev: Event): void => {
      if (this.handlingCheckoutPayTrigger) return
      this.handlingCheckoutPayTrigger = true

      const createCheckoutPromise = this.position === 'fewer-product-page'
        ? submitAddToCart().then(async () => { await this.createCheckout() })
        : this.createCheckout()

      createCheckoutPromise.then(() => {
        const amount = this.checkoutButton?.getAttribute('amount')
        if (this.orderContent && this.checkoutButton && amount && parseFloat(amount) > 0) {
          this.checkoutButton.dispatchEvent(new CustomEvent('fewerPreCheckoutTriggerAck', {
            detail: {
              order_position: this.position,
              order_content: JSON.stringify(this.orderContent),
              plugin_version: this.buttonVersion ? 'woocommerce ' + this.buttonVersion : undefined
            }
          }))
        } else {
          throw new Error('Cannot Proceed With Amount Of Zero')
        }
      }).catch(err => {
        this.checkoutButton.dispatchEvent(new CustomEvent('fewerPreCheckoutTriggerError', {
          detail: {
            description: err?.toString()
          }
        }))
      }).finally(() => {
        this.handlingCheckoutPayTrigger = false
      })
    }

    this.checkoutButton.addEventListener('fewerCheckoutSuccess', fewerCheckoutSuccess, false)
    this.checkoutButton.addEventListener('updateOrderOnPaymentsuccess', updateOrderOnPaymentsuccess, false)
    this.checkoutButton.addEventListener('fewerAddressUpdate', fewerAddressUpdate, false)
    this.checkoutButton.addEventListener('fewerDismissed', fewerDismissed, false)
    this.checkoutButton.addEventListener('fewerPrePayTrigger', fewerPrePayTrigger, false)
    this.checkoutButton.addEventListener('fewerPreCheckoutTrigger', fewerPreCheckoutTrigger, false)

    this.checkoutButton.setAttribute('events-registered', 'true')
  }

  async createCheckout (): Promise<void> {
    const url = window.location.origin + this.originPrefix + '/wp-json/wc/fewer/v2/checkout/create'
    const res = await postData(url, {
      fewer_cart_id: this.buttonId,
      pre_existing_order_id: this.pre_existing_order_id
    })
    const data = await res.json()
    this.checkoutButton.setAttribute('taxes', data.taxes)
    this.checkoutButton.setAttribute('amount', data.amount)
    this.checkoutButton.setAttribute('discount', data.discount)
    this.orderContent = data.order_content
  }

  async cancelOrder (fewerTransactionID: string): Promise<Response | undefined> {
    if (this.position === 'fewer-product-page') {
      const url = window.location.origin + this.originPrefix + '/wp-json/wc/fewer/v2/orders/cancel'
      return await postData(url, {
        fewer_cart_id: this.buttonId,
        fewer_transaction_id: fewerTransactionID
      })
    }
  }

  async completeOrder (assertTransactionStatus: boolean = true): Promise<Response> {
    const orderId = this.checkoutButton?.getAttribute('checkout-order-id') ?? this.genOrderId ?? ''
    const url = window.location.origin + this.originPrefix + '/wp-json/wc/fewer/v2/order/complete'
    return await postData(url, {
      fewer_cart_id: this.buttonId,
      order_id: orderId,
      assert_transaction_status: assertTransactionStatus
    })
  }
}

const postData = async function (url: string, data: any): Promise<Response> {
  return await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
}

const submitAddToCart = async (): Promise<void> => {
  const cartForm = document.querySelector('form.cart')
  if (cartForm == null) throw new Error('Product form not found')
  const formURL = cartForm.getAttribute('action') ?? window.location.href
  if (!formURL) throw new Error('Product form URL not found')
  const formSubmitButton = document.querySelector<HTMLButtonElement>("form.cart button[type='submit']")
  if (!formSubmitButton) throw new Error('Submit button not found')
  const productId = formSubmitButton.value
  const cartFormData = new FormData(cartForm as HTMLFormElement)
  const formData = { 'add-to-cart': productId, ...Object.fromEntries(cartFormData.entries()) }
  await addToCart(formURL, formData)
}

const addToCart = async (formURL: string, formData: Record<string, string>): Promise<void> => {
  await new Promise<void>((resolve, reject) => {
    void jQuery.ajax({
      url: formURL,
      type: 'POST',
      data: formData,
      success: function (response) {
        if (response?.indexOf('woocommerce-error') > 0) {
          const responseDOM = new DOMParser().parseFromString(response, 'text/html')
          const list = responseDOM.querySelectorAll('.woocommerce-error li')
          const errorList: string[] = []
          list.forEach((errorEl) => {
            errorList.push(errorEl.textContent?.trim() ?? '')
          })
          if (errorList.length > 0) {
            reject(new Error(errorList.join('\n')))
            return
          }
        }
        resolve()
      },
      error: function () {
        reject(new Error('ajax adding to cart error'))
      }
    })
  })
}
