"use strict";(globalThis.webpackChunkfewer_checkout_woocommerce=globalThis.webpackChunkfewer_checkout_woocommerce||[]).push([[9481,2893],{3641:(e,i,t)=>{t.d(i,{c:()=>n,g:()=>r,h:()=>o,o:()=>s});const o=(e,i)=>null!==i.closest(e),n=(e,i)=>"string"==typeof e&&e.length>0?Object.assign({"ion-color":!0,[`ion-color-${e}`]:!0},i):i,r=e=>{const i={};return(e=>void 0!==e?(Array.isArray(e)?e:e.split(" ")).filter((e=>null!=e)).map((e=>e.trim())).filter((e=>""!==e)):[])(e).forEach((e=>i[e]=!0)),i},a=/^[a-z][a-z0-9+\-.]*:/,s=async(e,i,t,o)=>{if(null!=e&&"#"!==e[0]&&!a.test(e)){const n=document.querySelector("ion-router");if(n)return null!=i&&i.preventDefault(),n.push(e,t,o)}return!1}},3986:(e,i,t)=>{t.d(i,{a:()=>n,b:()=>r,p:()=>o});const o=(e,...i)=>console.warn(`[Ionic Warning]: ${e}`,...i),n=(e,...i)=>console.error(`[Ionic Error]: ${e}`,...i),r=(e,...i)=>console.error(`<${e.tagName.toLowerCase()}> must be used inside ${i.join(" or ")}.`)},9481:(e,i,t)=>{t.r(i),t.d(i,{ion_picker:()=>d});var o=t(6472),n=t(2445),r=t(2736),a=t(3641),s=t(741);t(1810);const l=e=>{const i=(0,s.c)(),t=(0,s.c)(),o=(0,s.c)();return t.addElement(e.querySelector("ion-backdrop")).fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),o.addElement(e.querySelector(".picker-wrapper")).fromTo("transform","translateY(100%)","translateY(0%)"),i.addElement(e).easing("cubic-bezier(.36,.66,.04,1)").duration(400).addAnimation([t,o])},c=e=>{const i=(0,s.c)(),t=(0,s.c)(),o=(0,s.c)();return t.addElement(e.querySelector("ion-backdrop")).fromTo("opacity","var(--backdrop-opacity)",.01),o.addElement(e.querySelector(".picker-wrapper")).fromTo("transform","translateY(0%)","translateY(100%)"),i.addElement(e).easing("cubic-bezier(.36,.66,.04,1)").duration(400).addAnimation([t,o])},d=class{constructor(e){(0,o.r)(this,e),this.didPresent=(0,o.d)(this,"ionPickerDidPresent",7),this.willPresent=(0,o.d)(this,"ionPickerWillPresent",7),this.willDismiss=(0,o.d)(this,"ionPickerWillDismiss",7),this.didDismiss=(0,o.d)(this,"ionPickerDidDismiss",7),this.didPresentShorthand=(0,o.d)(this,"didPresent",7),this.willPresentShorthand=(0,o.d)(this,"willPresent",7),this.willDismissShorthand=(0,o.d)(this,"willDismiss",7),this.didDismissShorthand=(0,o.d)(this,"didDismiss",7),this.delegateController=(0,r.c)(this),this.triggerController=(0,r.a)(),this.onBackdropTap=()=>{this.dismiss(void 0,r.B)},this.dispatchCancelHandler=e=>{const i=e.detail.role;if((0,r.i)(i)){const e=this.buttons.find((e=>"cancel"===e.role));this.callButtonHandler(e)}},this.presented=!1,this.overlayIndex=void 0,this.delegate=void 0,this.hasController=!1,this.keyboardClose=!0,this.enterAnimation=void 0,this.leaveAnimation=void 0,this.buttons=[],this.columns=[],this.cssClass=void 0,this.duration=0,this.showBackdrop=!0,this.backdropDismiss=!0,this.animated=!0,this.htmlAttributes=void 0,this.isOpen=!1,this.trigger=void 0}onIsOpenChange(e,i){!0===e&&!1===i?this.present():!1===e&&!0===i&&this.dismiss()}triggerChanged(){const{trigger:e,el:i,triggerController:t}=this;e&&t.addClickListener(i,e)}connectedCallback(){(0,r.p)(this.el),this.triggerChanged()}disconnectedCallback(){this.triggerController.removeClickListener()}async present(){void 0!==this.currentTransition&&await this.currentTransition,await this.delegateController.attachViewToDom(),this.currentTransition=(0,r.b)(this,"pickerEnter",l,l,void 0),await this.currentTransition,this.currentTransition=void 0,this.duration>0&&(this.durationTimeout=setTimeout((()=>this.dismiss()),this.duration))}async dismiss(e,i){this.durationTimeout&&clearTimeout(this.durationTimeout),this.currentTransition=(0,r.d)(this,e,i,"pickerLeave",c,c);const t=await this.currentTransition;return t&&this.delegateController.removeViewFromDom(),t}onDidDismiss(){return(0,r.e)(this.el,"ionPickerDidDismiss")}onWillDismiss(){return(0,r.e)(this.el,"ionPickerWillDismiss")}getColumn(e){return Promise.resolve(this.columns.find((i=>i.name===e)))}async buttonClick(e){const i=e.role;return(0,r.i)(i)?this.dismiss(void 0,i):await this.callButtonHandler(e)?this.dismiss(this.getSelected(),e.role):Promise.resolve()}async callButtonHandler(e){return!e||!1!==await(0,r.s)(e.handler,this.getSelected())}getSelected(){const e={};return this.columns.forEach(((i,t)=>{const o=void 0!==i.selectedIndex?i.options[i.selectedIndex]:void 0;e[i.name]={text:o?o.text:void 0,value:o?o.value:void 0,columnIndex:t}})),e}render(){const{htmlAttributes:e}=this,i=(0,n.g)(this);return(0,o.h)(o.H,Object.assign({"aria-modal":"true",tabindex:"-1"},e,{style:{zIndex:`${2e4+this.overlayIndex}`},class:Object.assign({[i]:!0,[`picker-${i}`]:!0,"overlay-hidden":!0},(0,a.g)(this.cssClass)),onIonBackdropTap:this.onBackdropTap,onIonPickerWillDismiss:this.dispatchCancelHandler}),(0,o.h)("ion-backdrop",{visible:this.showBackdrop,tappable:this.backdropDismiss}),(0,o.h)("div",{tabindex:"0"}),(0,o.h)("div",{class:"picker-wrapper ion-overlay-wrapper",role:"dialog"},(0,o.h)("div",{class:"picker-toolbar"},this.buttons.map((e=>(0,o.h)("div",{class:h(e)},(0,o.h)("button",{type:"button",onClick:()=>this.buttonClick(e),class:p(e)},e.text))))),(0,o.h)("div",{class:"picker-columns"},(0,o.h)("div",{class:"picker-above-highlight"}),this.presented&&this.columns.map((e=>(0,o.h)("ion-picker-column",{col:e}))),(0,o.h)("div",{class:"picker-below-highlight"}))),(0,o.h)("div",{tabindex:"0"}))}get el(){return(0,o.e)(this)}static get watchers(){return{isOpen:["onIsOpenChange"],trigger:["triggerChanged"]}}},h=e=>({[`picker-toolbar-${e.role}`]:void 0!==e.role,"picker-toolbar-button":!0}),p=e=>Object.assign({"picker-button":!0,"ion-activatable":!0},(0,a.g)(e.cssClass));d.style={ios:".sc-ion-picker-ios-h{--border-radius:0;--border-style:solid;--min-width:auto;--width:100%;--max-width:500px;--min-height:auto;--max-height:auto;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;top:0;display:block;position:absolute;width:100%;height:100%;outline:none;font-family:var(--ion-font-family, inherit);contain:strict;user-select:none;z-index:1001}@supports (inset-inline-start: 0){.sc-ion-picker-ios-h{inset-inline-start:0}}@supports not (inset-inline-start: 0){.sc-ion-picker-ios-h{left:0}[dir=rtl].sc-ion-picker-ios-h,[dir=rtl] .sc-ion-picker-ios-h{left:unset;right:unset;right:0}}.overlay-hidden.sc-ion-picker-ios-h{display:none}.picker-wrapper.sc-ion-picker-ios{border-radius:var(--border-radius);left:0;right:0;bottom:0;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:auto;margin-bottom:auto;transform:translate3d(0,  100%,  0);display:flex;position:absolute;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);contain:strict;overflow:hidden;z-index:10}.picker-toolbar.sc-ion-picker-ios{width:100%;background:transparent;contain:strict;z-index:1}.picker-button.sc-ion-picker-ios{border:0;font-family:inherit}.picker-button.sc-ion-picker-ios:active,.picker-button.sc-ion-picker-ios:focus{outline:none}.picker-columns.sc-ion-picker-ios{display:flex;position:relative;justify-content:center;margin-bottom:var(--ion-safe-area-bottom, 0);contain:strict;direction:ltr;overflow:hidden}.picker-above-highlight.sc-ion-picker-ios,.picker-below-highlight.sc-ion-picker-ios{display:none;pointer-events:none}.sc-ion-picker-ios-h{--background:var(--ion-background-color, #fff);--border-width:1px 0 0;--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, #c8c7cc)));--height:260px;--backdrop-opacity:var(--ion-backdrop-opacity, 0.26);color:var(--ion-item-color, var(--ion-text-color, #000))}.picker-toolbar.sc-ion-picker-ios{display:flex;height:44px;border-bottom:0.55px solid var(--border-color)}.picker-toolbar-button.sc-ion-picker-ios{flex:1;text-align:end}.picker-toolbar-button.sc-ion-picker-ios:last-child .picker-button.sc-ion-picker-ios{font-weight:600}.picker-toolbar-button.sc-ion-picker-ios:first-child{font-weight:normal;text-align:start}.picker-button.sc-ion-picker-ios,.picker-button.ion-activated.sc-ion-picker-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-padding-start:1em;padding-inline-start:1em;-webkit-padding-end:1em;padding-inline-end:1em;padding-top:0;padding-bottom:0;height:44px;background:transparent;color:var(--ion-color-primary, #3880ff);font-size:16px}.picker-columns.sc-ion-picker-ios{height:215px;perspective:1000px}.picker-above-highlight.sc-ion-picker-ios{top:0;transform:translate3d(0,  0,  90px);display:block;position:absolute;width:100%;height:81px;border-bottom:1px solid var(--border-color);background:linear-gradient(to bottom, var(--background, var(--ion-background-color, #fff)) 20%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0.8) 100%);z-index:10}@supports (inset-inline-start: 0){.picker-above-highlight.sc-ion-picker-ios{inset-inline-start:0}}@supports not (inset-inline-start: 0){.picker-above-highlight.sc-ion-picker-ios{left:0}[dir=rtl].sc-ion-picker-ios .picker-above-highlight.sc-ion-picker-ios,[dir=rtl].sc-ion-picker-ios-h .picker-above-highlight.sc-ion-picker-ios,[dir=rtl] .sc-ion-picker-ios-h .picker-above-highlight.sc-ion-picker-ios{left:unset;right:unset;right:0}}.picker-below-highlight.sc-ion-picker-ios{top:115px;transform:translate3d(0,  0,  90px);display:block;position:absolute;width:100%;height:119px;border-top:1px solid var(--border-color);background:linear-gradient(to top, var(--background, var(--ion-background-color, #fff)) 30%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0.8) 100%);z-index:11}@supports (inset-inline-start: 0){.picker-below-highlight.sc-ion-picker-ios{inset-inline-start:0}}@supports not (inset-inline-start: 0){.picker-below-highlight.sc-ion-picker-ios{left:0}[dir=rtl].sc-ion-picker-ios .picker-below-highlight.sc-ion-picker-ios,[dir=rtl].sc-ion-picker-ios-h .picker-below-highlight.sc-ion-picker-ios,[dir=rtl] .sc-ion-picker-ios-h .picker-below-highlight.sc-ion-picker-ios{left:unset;right:unset;right:0}}",md:".sc-ion-picker-md-h{--border-radius:0;--border-style:solid;--min-width:auto;--width:100%;--max-width:500px;--min-height:auto;--max-height:auto;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;top:0;display:block;position:absolute;width:100%;height:100%;outline:none;font-family:var(--ion-font-family, inherit);contain:strict;user-select:none;z-index:1001}@supports (inset-inline-start: 0){.sc-ion-picker-md-h{inset-inline-start:0}}@supports not (inset-inline-start: 0){.sc-ion-picker-md-h{left:0}[dir=rtl].sc-ion-picker-md-h,[dir=rtl] .sc-ion-picker-md-h{left:unset;right:unset;right:0}}.overlay-hidden.sc-ion-picker-md-h{display:none}.picker-wrapper.sc-ion-picker-md{border-radius:var(--border-radius);left:0;right:0;bottom:0;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:auto;margin-bottom:auto;transform:translate3d(0,  100%,  0);display:flex;position:absolute;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);contain:strict;overflow:hidden;z-index:10}.picker-toolbar.sc-ion-picker-md{width:100%;background:transparent;contain:strict;z-index:1}.picker-button.sc-ion-picker-md{border:0;font-family:inherit}.picker-button.sc-ion-picker-md:active,.picker-button.sc-ion-picker-md:focus{outline:none}.picker-columns.sc-ion-picker-md{display:flex;position:relative;justify-content:center;margin-bottom:var(--ion-safe-area-bottom, 0);contain:strict;direction:ltr;overflow:hidden}.picker-above-highlight.sc-ion-picker-md,.picker-below-highlight.sc-ion-picker-md{display:none;pointer-events:none}.sc-ion-picker-md-h{--background:var(--ion-background-color, #fff);--border-width:0.55px 0 0;--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))));--height:260px;--backdrop-opacity:var(--ion-backdrop-opacity, 0.26);color:var(--ion-item-color, var(--ion-text-color, #000))}.picker-toolbar.sc-ion-picker-md{display:flex;justify-content:flex-end;height:44px}.picker-button.sc-ion-picker-md,.picker-button.ion-activated.sc-ion-picker-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-padding-start:1.1em;padding-inline-start:1.1em;-webkit-padding-end:1.1em;padding-inline-end:1.1em;padding-top:0;padding-bottom:0;height:44px;background:transparent;color:var(--ion-color-primary, #3880ff);font-size:14px;font-weight:500;text-transform:uppercase;box-shadow:none}.picker-columns.sc-ion-picker-md{height:216px;perspective:1800px}.picker-above-highlight.sc-ion-picker-md{top:0;transform:translate3d(0,  0,  90px);position:absolute;width:100%;height:81px;border-bottom:1px solid var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))));background:linear-gradient(to bottom, var(--ion-background-color, #fff) 20%, rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8) 100%);z-index:10}@supports (inset-inline-start: 0){.picker-above-highlight.sc-ion-picker-md{inset-inline-start:0}}@supports not (inset-inline-start: 0){.picker-above-highlight.sc-ion-picker-md{left:0}[dir=rtl].sc-ion-picker-md .picker-above-highlight.sc-ion-picker-md,[dir=rtl].sc-ion-picker-md-h .picker-above-highlight.sc-ion-picker-md,[dir=rtl] .sc-ion-picker-md-h .picker-above-highlight.sc-ion-picker-md{left:unset;right:unset;right:0}}.picker-below-highlight.sc-ion-picker-md{top:115px;transform:translate3d(0,  0,  90px);position:absolute;width:100%;height:119px;border-top:1px solid var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))));background:linear-gradient(to top, var(--ion-background-color, #fff) 30%, rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8) 100%);z-index:11}@supports (inset-inline-start: 0){.picker-below-highlight.sc-ion-picker-md{inset-inline-start:0}}@supports not (inset-inline-start: 0){.picker-below-highlight.sc-ion-picker-md{left:0}[dir=rtl].sc-ion-picker-md .picker-below-highlight.sc-ion-picker-md,[dir=rtl].sc-ion-picker-md-h .picker-below-highlight.sc-ion-picker-md,[dir=rtl] .sc-ion-picker-md-h .picker-below-highlight.sc-ion-picker-md{left:unset;right:unset;right:0}}"}},1810:(e,i,t)=>{t.d(i,{w:()=>o});const o="undefined"!=typeof window?window:void 0},2893:(e,i,t)=>{t.r(i),t.d(i,{MENU_BACK_BUTTON_PRIORITY:()=>a,OVERLAY_BACK_BUTTON_PRIORITY:()=>r,blockHardwareBackButton:()=>o,startHardwareBackButton:()=>n});const o=()=>{document.addEventListener("backbutton",(()=>{}))},n=()=>{const e=document;let i=!1;e.addEventListener("backbutton",(()=>{if(i)return;let t=0,o=[];const n=new CustomEvent("ionBackButton",{bubbles:!1,detail:{register(e,i){o.push({priority:e,handler:i,id:t++})}}});e.dispatchEvent(n);const r=()=>{if(o.length>0){let e={priority:Number.MIN_SAFE_INTEGER,handler:()=>{},id:-1};o.forEach((i=>{i.priority>=e.priority&&(e=i)})),i=!0,o=o.filter((i=>i.id!==e.id)),(async e=>{try{if(null==e?void 0:e.handler){const i=e.handler(r);null!=i&&await i}}catch(e){console.error(e)}})(e).then((()=>i=!1))}};r()}))},r=100,a=99},3098:(e,i,t)=>{t.d(i,{C:()=>a,a:()=>n,d:()=>r});var o=t(6567);const n=async(e,i,t,n,r,a)=>{var s;if(e)return e.attachViewToDom(i,t,r,n);if(!(a||"string"==typeof t||t instanceof HTMLElement))throw new Error("framework delegate is missing");const l="string"==typeof t?null===(s=i.ownerDocument)||void 0===s?void 0:s.createElement(t):t;return n&&n.forEach((e=>l.classList.add(e))),r&&Object.assign(l,r),i.appendChild(l),await new Promise((e=>(0,o.c)(l,e))),l},r=(e,i)=>{if(i){if(e){const t=i.parentElement;return e.removeViewFromDom(t,i)}i.remove()}return Promise.resolve()},a=()=>{let e,i;return{attachViewToDom:async(t,n,r={},a=[])=>{var s,l;if(e=t,n){const i="string"==typeof n?null===(s=e.ownerDocument)||void 0===s?void 0:s.createElement(n):n;a.forEach((e=>i.classList.add(e))),Object.assign(i,r),e.appendChild(i),await new Promise((e=>(0,o.c)(i,e)))}else if(e.children.length>0&&("ION-MODAL"===e.tagName||"ION-POPOVER"===e.tagName)&&!e.children[0].classList.contains("ion-delegate-host")){const i=null===(l=e.ownerDocument)||void 0===l?void 0:l.createElement("div");i.classList.add("ion-delegate-host"),a.forEach((e=>i.classList.add(e))),i.append(...e.children),e.appendChild(i)}const c=document.querySelector("ion-app")||document.body;return i=document.createComment("ionic teleport"),e.parentNode.insertBefore(i,e),c.appendChild(e),e},removeViewFromDom:()=>(e&&i&&(i.parentNode.insertBefore(e,i),i.remove()),Promise.resolve())}}},6567:(e,i,t)=>{t.d(i,{a:()=>d,b:()=>m,c:()=>r,d:()=>s,e:()=>v,f:()=>f,g:()=>p,h:()=>u,i:()=>c,j:()=>k,k:()=>C,l:()=>g,m:()=>x,n:()=>y,o:()=>a,p:()=>b,q:()=>T,r:()=>h,s:()=>A,t:()=>o,u:()=>E,v:()=>w});const o=(e,i=0)=>new Promise((t=>{n(e,i,t)})),n=(e,i=0,t)=>{let o,n;const r={passive:!0},a=()=>{o&&o()},s=i=>{void 0!==i&&e!==i.target||(a(),t(i))};return e&&(e.addEventListener("webkitTransitionEnd",s,r),e.addEventListener("transitionend",s,r),n=setTimeout(s,i+500),o=()=>{n&&(clearTimeout(n),n=void 0),e.removeEventListener("webkitTransitionEnd",s,r),e.removeEventListener("transitionend",s,r)}),a},r=(e,i)=>{e.componentOnReady?e.componentOnReady().then((e=>i(e))):m((()=>i(e)))},a=e=>void 0!==e.componentOnReady,s=(e,i=[])=>{const t={};return i.forEach((i=>{e.hasAttribute(i)&&(null!==e.getAttribute(i)&&(t[i]=e.getAttribute(i)),e.removeAttribute(i))})),t},l=["role","aria-activedescendant","aria-atomic","aria-autocomplete","aria-braillelabel","aria-brailleroledescription","aria-busy","aria-checked","aria-colcount","aria-colindex","aria-colindextext","aria-colspan","aria-controls","aria-current","aria-describedby","aria-description","aria-details","aria-disabled","aria-errormessage","aria-expanded","aria-flowto","aria-haspopup","aria-hidden","aria-invalid","aria-keyshortcuts","aria-label","aria-labelledby","aria-level","aria-live","aria-multiline","aria-multiselectable","aria-orientation","aria-owns","aria-placeholder","aria-posinset","aria-pressed","aria-readonly","aria-relevant","aria-required","aria-roledescription","aria-rowcount","aria-rowindex","aria-rowindextext","aria-rowspan","aria-selected","aria-setsize","aria-sort","aria-valuemax","aria-valuemin","aria-valuenow","aria-valuetext"],c=(e,i)=>{let t=l;return i&&i.length>0&&(t=t.filter((e=>!i.includes(e)))),s(e,t)},d=(e,i,t,o)=>{var n;if("undefined"!=typeof window){const r=window,a=null===(n=null==r?void 0:r.Ionic)||void 0===n?void 0:n.config;if(a){const n=a.get("_ael");if(n)return n(e,i,t,o);if(a._ael)return a._ael(e,i,t,o)}}return e.addEventListener(i,t,o)},h=(e,i,t,o)=>{var n;if("undefined"!=typeof window){const r=window,a=null===(n=null==r?void 0:r.Ionic)||void 0===n?void 0:n.config;if(a){const n=a.get("_rel");if(n)return n(e,i,t,o);if(a._rel)return a._rel(e,i,t,o)}}return e.removeEventListener(i,t,o)},p=(e,i=e)=>e.shadowRoot||i,m=e=>"function"==typeof __zone_symbol__requestAnimationFrame?__zone_symbol__requestAnimationFrame(e):"function"==typeof requestAnimationFrame?requestAnimationFrame(e):setTimeout(e),u=e=>!!e.shadowRoot&&!!e.attachShadow,g=e=>{const i=e.closest("ion-item");return i?i.querySelector("ion-label"):null},f=e=>{if(e.focus(),e.classList.contains("ion-focusable")){const i=e.closest("ion-app");i&&i.setFocus([e])}},b=(e,i)=>{let t;const o=e.getAttribute("aria-labelledby"),n=e.id;let r=null!==o&&""!==o.trim()?o:i+"-lbl",a=null!==o&&""!==o.trim()?document.getElementById(o):g(e);return a?(null===o&&(a.id=r),t=a.textContent,a.setAttribute("aria-hidden","true")):""!==n.trim()&&(a=document.querySelector(`label[for="${n}"]`),a&&(""!==a.id?r=a.id:a.id=r=`${n}-lbl`,t=a.textContent)),{label:a,labelId:r,labelText:t}},v=(e,i,t,o,n)=>{if(e||u(i)){let e=i.querySelector("input.aux-input");e||(e=i.ownerDocument.createElement("input"),e.type="hidden",e.classList.add("aux-input"),i.appendChild(e)),e.disabled=n,e.name=t,e.value=o||""}},k=(e,i,t)=>Math.max(e,Math.min(i,t)),y=(e,i)=>{if(!e){const e="ASSERT: "+i;throw console.error(e),new Error(e)}},w=e=>e.timeStamp||Date.now(),E=e=>{if(e){const i=e.changedTouches;if(i&&i.length>0){const e=i[0];return{x:e.clientX,y:e.clientY}}if(void 0!==e.pageX)return{x:e.pageX,y:e.pageY}}return{x:0,y:0}},x=e=>{const i="rtl"===document.dir;switch(e){case"start":return i;case"end":return!i;default:throw new Error(`"${e}" is not a valid value for [side]. Use "start" or "end" instead.`)}},C=(e,i)=>{const t=e._original||e;return{_original:e,emit:T(t.emit.bind(t),i)}},T=(e,i=0)=>{let t;return(...o)=>{clearTimeout(t),t=setTimeout(e,i,...o)}},A=(e,i)=>{if(null!=e||(e={}),null!=i||(i={}),e===i)return!0;const t=Object.keys(e);if(t.length!==Object.keys(i).length)return!1;for(const o of t){if(!(o in i))return!1;if(e[o]!==i[o])return!1}return!0}},2736:(e,i,t)=>{t.d(i,{B:()=>$,G:()=>B,a:()=>F,b:()=>C,c:()=>R,d:()=>A,e:()=>P,f:()=>c,g:()=>E,h:()=>u,i:()=>O,j:()=>p,k:()=>h,l:()=>v,m:()=>m,p:()=>g,s:()=>I});var o=t(2445),n=t(3098),r=t(2893),a=t(6567),s=t(3986);let l=0;const c=new WeakMap,d=e=>({create:i=>f(e,i),dismiss:(i,t,o)=>w(document,i,t,e,o),getTop:async()=>E(document,e)}),h=d("ion-alert"),p=d("ion-action-sheet"),m=d("ion-modal"),u=d("ion-popover"),g=e=>{"undefined"!=typeof document&&y(document);const i=l++;e.overlayIndex=i,e.hasAttribute("id")||(e.id=`ion-overlay-${i}`)},f=(e,i)=>"undefined"!=typeof window&&void 0!==window.customElements?window.customElements.whenDefined(e).then((()=>{const t=document.createElement(e);return t.classList.add("overlay-hidden"),Object.assign(t,Object.assign(Object.assign({},i),{hasController:!0})),D(document).appendChild(t),new Promise((e=>(0,a.c)(t,e)))})):Promise.resolve(),b='[tabindex]:not([tabindex^="-"]):not([hidden]):not([disabled]), input:not([type=hidden]):not([tabindex^="-"]):not([hidden]):not([disabled]), textarea:not([tabindex^="-"]):not([hidden]):not([disabled]), button:not([tabindex^="-"]):not([hidden]):not([disabled]), select:not([tabindex^="-"]):not([hidden]):not([disabled]), .ion-focusable:not([tabindex^="-"]):not([hidden]):not([disabled]), .ion-focusable[disabled="false"]:not([tabindex^="-"]):not([hidden])',v=(e,i)=>{let t=e.querySelector(b);const o=null==t?void 0:t.shadowRoot;o&&(t=o.querySelector(b)||t),t?(0,a.f)(t):i.focus()},k=(e,i)=>{const t=Array.from(e.querySelectorAll(b));let o=t.length>0?t[t.length-1]:null;const n=null==o?void 0:o.shadowRoot;n&&(o=n.querySelector(b)||o),o?o.focus():i.focus()},y=e=>{0===l&&(l=1,e.addEventListener("focus",(i=>{((e,i)=>{const t=E(i,"ion-alert,ion-action-sheet,ion-loading,ion-modal,ion-picker,ion-popover"),o=e.target;t&&o&&(t.classList.contains("ion-disable-focus-trap")||(t.shadowRoot?(()=>{if(t.contains(o))t.lastFocus=o;else{const e=t.lastFocus;v(t,t),e===i.activeElement&&k(t,t),t.lastFocus=i.activeElement}})():(()=>{if(t===o)t.lastFocus=void 0;else{const e=(0,a.g)(t);if(!e.contains(o))return;const n=e.querySelector(".ion-overlay-wrapper");if(!n)return;if(n.contains(o))t.lastFocus=o;else{const e=t.lastFocus;v(n,t),e===i.activeElement&&k(n,t),t.lastFocus=i.activeElement}}})()))})(i,e)}),!0),e.addEventListener("ionBackButton",(i=>{const t=E(e);(null==t?void 0:t.backdropDismiss)&&i.detail.register(r.OVERLAY_BACK_BUTTON_PRIORITY,(()=>t.dismiss(void 0,$)))})),e.addEventListener("keydown",(i=>{if("Escape"===i.key){const i=E(e);(null==i?void 0:i.backdropDismiss)&&i.dismiss(void 0,$)}})))},w=(e,i,t,o,n)=>{const r=E(e,o,n);return r?r.dismiss(i,t):Promise.reject("overlay does not exist")},E=(e,i,t)=>{const o=((e,i)=>(void 0===i&&(i="ion-alert,ion-action-sheet,ion-loading,ion-modal,ion-picker,ion-popover,ion-toast"),Array.from(e.querySelectorAll(i)).filter((e=>e.overlayIndex>0))))(e,i).filter((e=>!(e=>e.classList.contains("overlay-hidden"))(e)));return void 0===t?o[o.length-1]:o.find((e=>e.id===t))},x=(e=!1)=>{const i=D(document).querySelector("ion-router-outlet, ion-nav, #ion-view-container-root");i&&(e?i.setAttribute("aria-hidden","true"):i.removeAttribute("aria-hidden"))},C=async(e,i,t,n,r)=>{var a,s;if(e.presented)return;x(!0),e.presented=!0,e.willPresent.emit(),null===(a=e.willPresentShorthand)||void 0===a||a.emit();const l=(0,o.g)(e),c=e.enterAnimation?e.enterAnimation:o.c.get(i,"ios"===l?t:n);await S(e,c,e.el,r)&&(e.didPresent.emit(),null===(s=e.didPresentShorthand)||void 0===s||s.emit()),"ION-TOAST"!==e.el.tagName&&T(e.el),!e.keyboardClose||null!==document.activeElement&&e.el.contains(document.activeElement)||e.el.focus()},T=async e=>{let i=document.activeElement;if(!i)return;const t=null==i?void 0:i.shadowRoot;t&&(i=t.querySelector(b)||i),await e.onDidDismiss(),i.focus()},A=async(e,i,t,n,r,a,s)=>{var l,d;if(!e.presented)return!1;x(!1),e.presented=!1;try{e.el.style.setProperty("pointer-events","none"),e.willDismiss.emit({data:i,role:t}),null===(l=e.willDismissShorthand)||void 0===l||l.emit({data:i,role:t});const h=(0,o.g)(e),p=e.leaveAnimation?e.leaveAnimation:o.c.get(n,"ios"===h?r:a);t!==B&&await S(e,p,e.el,s),e.didDismiss.emit({data:i,role:t}),null===(d=e.didDismissShorthand)||void 0===d||d.emit({data:i,role:t}),c.delete(e),e.el.classList.add("overlay-hidden"),e.el.style.removeProperty("pointer-events"),void 0!==e.el.lastFocus&&(e.el.lastFocus=void 0)}catch(e){console.error(e)}return e.el.remove(),!0},D=e=>e.querySelector("ion-app")||e.body,S=async(e,i,t,n)=>{t.classList.remove("overlay-hidden");const r=i(e.el,n);e.animated&&o.c.getBoolean("animated",!0)||r.duration(0),e.keyboardClose&&r.beforeAddWrite((()=>{const e=t.ownerDocument.activeElement;(null==e?void 0:e.matches("input,ion-input, ion-textarea"))&&e.blur()}));const a=c.get(e)||[];return c.set(e,[...a,r]),await r.play(),!0},P=(e,i)=>{let t;const o=new Promise((e=>t=e));return L(e,i,(e=>{t(e.detail)})),o},L=(e,i,t)=>{const o=n=>{(0,a.r)(e,i,o),t(n)};(0,a.a)(e,i,o)},O=e=>"cancel"===e||e===$,_=e=>e(),I=(e,i)=>{if("function"==typeof e)return o.c.get("_zoneGate",_)((()=>{try{return e(i)}catch(e){throw e}}))},$="backdrop",B="gesture",R=e=>{let i,t=!1;const o=(0,n.C)(),r=(n=!1)=>{if(i&&!n)return{delegate:i,inline:t};const{el:r,hasController:a,delegate:s}=e,l=r.parentNode;return t=null!==l&&!a,i=t?s||o:s,{inline:t,delegate:i}};return{attachViewToDom:async i=>{const{delegate:t}=r(!0);if(t)return await t.attachViewToDom(e.el,i);const{hasController:o}=e;if(o&&void 0!==i)throw new Error("framework delegate is missing");return null},removeViewFromDom:()=>{const{delegate:i}=r();i&&void 0!==e.el&&i.removeViewFromDom(e.el.parentElement,e.el)}}},F=()=>{let e;const i=()=>{e&&(e(),e=void 0)};return{addClickListener:(t,o)=>{i();const n=void 0!==o?document.getElementById(o):null;n?e=((e,i)=>{const t=()=>{i.present()};return e.addEventListener("click",t),()=>{e.removeEventListener("click",t)}})(n,t):(0,s.p)(`A trigger element with the ID "${o}" was not found in the DOM. The trigger element must be in the DOM when the "trigger" property is set on an overlay component.`,t)},removeClickListener:i}}},741:(e,i,t)=>{t.d(i,{c:()=>g});var o=t(6567),n=t(1810);let r;const a=e=>(e.forEach((e=>{for(const i in e)if(e.hasOwnProperty(i)){const t=e[i];if("easing"===i)e["animation-timing-function"]=t,delete e[i];else{const o=s(i);o!==i&&(e[o]=t,delete e[i])}}})),e),s=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),l=e=>{if(void 0===r){const i=void 0!==e.style.animationName,t=void 0!==e.style.webkitAnimationName;r=!i&&t?"-webkit-":""}return r},c=(e,i,t)=>{const o=i.startsWith("animation")?l(e):"";e.style.setProperty(o+i,t)},d=(e,i)=>{const t=i.startsWith("animation")?l(e):"";e.style.removeProperty(t+i)},h=[],p=e=>{let i=h.indexOf(e);return i<0&&(i=h.push(e)-1),`ion-animation-${i}`},m=(e,i,t)=>{var o;const n=(e=>{const i=void 0!==e.getRootNode?e.getRootNode():e;return i.head||i})(t),r=l(t),a=n.querySelector("#"+e);if(a)return a;const s=(null!==(o=t.ownerDocument)&&void 0!==o?o:document).createElement("style");return s.id=e,s.textContent=`@${r}keyframes ${e} { ${i} } @${r}keyframes ${e}-alt { ${i} }`,n.appendChild(s),s},u=(e=[],i)=>{if(void 0!==i){const t=Array.isArray(i)?i:[i];return[...e,...t]}return e},g=e=>{let i,t,r,s,l,h,g,f,b,v,k,y,w,E=[],x=[],C=[],T=!1,A={},D=[],S=[],P={},L=0,O=!1,_=!1,I=!0,$=!1,B=!0,R=!1;const F=e,q=[],z=[],N=[],j=[],V=[],W=[],M=[],Y=[],H=[],K=[],U="function"==typeof AnimationEffect||void 0!==n.w&&"function"==typeof n.w.AnimationEffect,G="function"==typeof Element&&"function"==typeof Element.prototype.animate&&U,X=()=>K,Z=(e,i)=>(((null==i?void 0:i.oneTimeCallback)?z:q).push({c:e,o:i}),w),J=()=>{if(G)K.forEach((e=>{e.cancel()})),K.length=0;else{const e=N.slice();(0,o.b)((()=>{e.forEach((e=>{d(e,"animation-name"),d(e,"animation-duration"),d(e,"animation-timing-function"),d(e,"animation-iteration-count"),d(e,"animation-delay"),d(e,"animation-play-state"),d(e,"animation-fill-mode"),d(e,"animation-direction")}))}))}},Q=()=>{V.forEach((e=>{(null==e?void 0:e.parentNode)&&e.parentNode.removeChild(e)})),V.length=0},ee=()=>void 0!==l?l:g?g.getFill():"both",ie=()=>void 0!==b?b:void 0!==h?h:g?g.getDirection():"normal",te=()=>O?"linear":void 0!==r?r:g?g.getEasing():"linear",oe=()=>_?0:void 0!==v?v:void 0!==t?t:g?g.getDuration():0,ne=()=>void 0!==s?s:g?g.getIterations():1,re=()=>void 0!==k?k:void 0!==i?i:g?g.getDelay():0,ae=()=>{0!==L&&(L--,0===L&&((()=>{ge(),Y.forEach((e=>e())),H.forEach((e=>e()));const e=I?1:0,i=D,t=S,o=P;N.forEach((e=>{const n=e.classList;i.forEach((e=>n.add(e))),t.forEach((e=>n.remove(e)));for(const i in o)o.hasOwnProperty(i)&&c(e,i,o[i])})),q.forEach((i=>i.c(e,w))),z.forEach((i=>i.c(e,w))),z.length=0,B=!0,I&&($=!0),I=!0})(),g&&g.animationFinish()))},se=(i=!0)=>{Q();const t=a(E);N.forEach((n=>{if(t.length>0){const r=((e=[])=>e.map((e=>{const i=e.offset,t=[];for(const i in e)e.hasOwnProperty(i)&&"offset"!==i&&t.push(`${i}: ${e[i]};`);return`${100*i}% { ${t.join(" ")} }`})).join(" "))(t);y=void 0!==e?e:p(r);const a=m(y,r,n);V.push(a),c(n,"animation-duration",`${oe()}ms`),c(n,"animation-timing-function",te()),c(n,"animation-delay",`${re()}ms`),c(n,"animation-fill-mode",ee()),c(n,"animation-direction",ie());const s=ne()===1/0?"infinite":ne().toString();c(n,"animation-iteration-count",s),c(n,"animation-play-state","paused"),i&&c(n,"animation-name",`${a.id}-alt`),(0,o.b)((()=>{c(n,"animation-name",a.id||null)}))}}))},le=(e=!0)=>{(()=>{W.forEach((e=>e())),M.forEach((e=>e()));const e=x,i=C,t=A;N.forEach((o=>{const n=o.classList;e.forEach((e=>n.add(e))),i.forEach((e=>n.remove(e)));for(const e in t)t.hasOwnProperty(e)&&c(o,e,t[e])}))})(),E.length>0&&(G?(N.forEach((e=>{const i=e.animate(E,{id:F,delay:re(),duration:oe(),easing:te(),iterations:ne(),fill:ee(),direction:ie()});i.pause(),K.push(i)})),K.length>0&&(K[0].onfinish=()=>{ae()})):se(e)),T=!0},ce=e=>{if(e=Math.min(Math.max(e,0),.9999),G)K.forEach((i=>{i.currentTime=i.effect.getComputedTiming().delay+oe()*e,i.pause()}));else{const i=`-${oe()*e}ms`;N.forEach((e=>{E.length>0&&(c(e,"animation-delay",i),c(e,"animation-play-state","paused"))}))}},de=e=>{K.forEach((e=>{e.effect.updateTiming({delay:re(),duration:oe(),easing:te(),iterations:ne(),fill:ee(),direction:ie()})})),void 0!==e&&ce(e)},he=(e=!0,i)=>{(0,o.b)((()=>{N.forEach((t=>{c(t,"animation-name",y||null),c(t,"animation-duration",`${oe()}ms`),c(t,"animation-timing-function",te()),c(t,"animation-delay",void 0!==i?`-${i*oe()}ms`:`${re()}ms`),c(t,"animation-fill-mode",ee()||null),c(t,"animation-direction",ie()||null);const n=ne()===1/0?"infinite":ne().toString();c(t,"animation-iteration-count",n),e&&c(t,"animation-name",`${y}-alt`),(0,o.b)((()=>{c(t,"animation-name",y||null)}))}))}))},pe=(e=!1,i=!0,t)=>(e&&j.forEach((o=>{o.update(e,i,t)})),G?de(t):he(i,t),w),me=()=>{T&&(G?K.forEach((e=>{e.pause()})):N.forEach((e=>{c(e,"animation-play-state","paused")})),R=!0)},ue=()=>{f=void 0,ae()},ge=()=>{f&&clearTimeout(f)},fe=e=>new Promise((i=>{(null==e?void 0:e.sync)&&(_=!0,Z((()=>_=!1),{oneTimeCallback:!0})),T||le(),$&&(G?(ce(0),de()):he(),$=!1),B&&(L=j.length+1,B=!1),Z((()=>i()),{oneTimeCallback:!0}),j.forEach((e=>{e.play()})),G?(K.forEach((e=>{e.play()})),0!==E.length&&0!==N.length||ae()):(()=>{if(ge(),(0,o.b)((()=>{N.forEach((e=>{E.length>0&&c(e,"animation-play-state","running")}))})),0===E.length||0===N.length)ae();else{const e=re()||0,i=oe()||0,t=ne()||1;isFinite(t)&&(f=setTimeout(ue,e+i*t+100)),((e,i)=>{let t;const n={passive:!0},r=()=>{t&&t()},a=i=>{e===i.target&&(r(),ge(),(0,o.b)((()=>{N.forEach((e=>{d(e,"animation-duration"),d(e,"animation-delay"),d(e,"animation-play-state")})),(0,o.b)(ae)})))};e&&(e.addEventListener("webkitAnimationEnd",a,n),e.addEventListener("animationend",a,n),t=()=>{e.removeEventListener("webkitAnimationEnd",a,n),e.removeEventListener("animationend",a,n)})})(N[0])}})(),R=!1})),be=(e,i)=>{const t=E[0];return void 0===t||void 0!==t.offset&&0!==t.offset?E=[{offset:0,[e]:i},...E]:t[e]=i,w};return w={parentAnimation:g,elements:N,childAnimations:j,id:F,animationFinish:ae,from:be,to:(e,i)=>{const t=E[E.length-1];return void 0===t||void 0!==t.offset&&1!==t.offset?E=[...E,{offset:1,[e]:i}]:t[e]=i,w},fromTo:(e,i,t)=>be(e,i).to(e,t),parent:e=>(g=e,w),play:fe,pause:()=>(j.forEach((e=>{e.pause()})),me(),w),stop:()=>{j.forEach((e=>{e.stop()})),T&&(J(),T=!1),O=!1,_=!1,B=!0,b=void 0,v=void 0,k=void 0,L=0,$=!1,I=!0,R=!1},destroy:e=>(j.forEach((i=>{i.destroy(e)})),(e=>{J(),e&&Q()})(e),N.length=0,j.length=0,E.length=0,q.length=0,z.length=0,T=!1,B=!0,w),keyframes:e=>{const i=E!==e;return E=e,i&&(e=>{G?X().forEach((i=>{if(i.effect.setKeyframes)i.effect.setKeyframes(e);else{const t=new KeyframeEffect(i.effect.target,e,i.effect.getTiming());i.effect=t}})):se()})(E),w},addAnimation:e=>{if(null!=e)if(Array.isArray(e))for(const i of e)i.parent(w),j.push(i);else e.parent(w),j.push(e);return w},addElement:e=>{if(null!=e)if(1===e.nodeType)N.push(e);else if(e.length>=0)for(let i=0;i<e.length;i++)N.push(e[i]);else console.error("Invalid addElement value");return w},update:pe,fill:e=>(l=e,pe(!0),w),direction:e=>(h=e,pe(!0),w),iterations:e=>(s=e,pe(!0),w),duration:e=>(G||0!==e||(e=1),t=e,pe(!0),w),easing:e=>(r=e,pe(!0),w),delay:e=>(i=e,pe(!0),w),getWebAnimations:X,getKeyframes:()=>E,getFill:ee,getDirection:ie,getDelay:re,getIterations:ne,getEasing:te,getDuration:oe,afterAddRead:e=>(Y.push(e),w),afterAddWrite:e=>(H.push(e),w),afterClearStyles:(e=[])=>{for(const i of e)P[i]="";return w},afterStyles:(e={})=>(P=e,w),afterRemoveClass:e=>(S=u(S,e),w),afterAddClass:e=>(D=u(D,e),w),beforeAddRead:e=>(W.push(e),w),beforeAddWrite:e=>(M.push(e),w),beforeClearStyles:(e=[])=>{for(const i of e)A[i]="";return w},beforeStyles:(e={})=>(A=e,w),beforeRemoveClass:e=>(C=u(C,e),w),beforeAddClass:e=>(x=u(x,e),w),onFinish:Z,isRunning:()=>0!==L&&!R,progressStart:(e=!1,i)=>(j.forEach((t=>{t.progressStart(e,i)})),me(),O=e,T||le(),pe(!1,!0,i),w),progressStep:e=>(j.forEach((i=>{i.progressStep(e)})),ce(e),w),progressEnd:(e,i,t)=>(O=!1,j.forEach((o=>{o.progressEnd(e,i,t)})),void 0!==t&&(v=t),$=!1,I=!0,0===e?(b="reverse"===ie()?"normal":"reverse","reverse"===b&&(I=!1),G?(pe(),ce(1-i)):(k=(1-i)*oe()*-1,pe(!1,!1))):1===e&&(G?(pe(),ce(i)):(k=i*oe()*-1,pe(!1,!1))),void 0!==e&&(Z((()=>{v=void 0,b=void 0,k=void 0}),{oneTimeCallback:!0}),g||fe()),w)}}}}]);