<?php
add_action('wp_enqueue_scripts', 'fewerwc_enqueue_assets');

function fewerwc_enqueue_assets()
{

    wp_enqueue_script('fewer-checkout-sdk-script', plugins_url('../assets/build/index.js?aver=' . FEWERWC_VERSION, __FILE__) , array('jquery'), FEWERWC_VERSION,true);
    wp_enqueue_style('fewer-checkout-style', plugins_url('../assets/fewer-checkout.css?aver=' . FEWERWC_VERSION, __FILE__) , [], FEWERWC_VERSION);
    wp_enqueue_style('fewer-bcheckout-style', plugins_url('../assets/bootstrap.min.css?aver=' . FEWERWC_VERSION, __FILE__) , [], FEWERWC_VERSION);
    

    wp_enqueue_script('fewer-bb-checkout-sdk-script', plugins_url('../assets/bootstrap.min.js?aver=' . FEWERWC_VERSION, __FILE__) , array('jquery'), FEWERWC_VERSION,true);

    wp_enqueue_script('fewer-checkout-script', plugins_url('../assets/build/fewer-checkout.js?aver=' . FEWERWC_VERSION, __FILE__) , array('jquery'), FEWERWC_VERSION,true);
    wp_localize_script( 'fewer-checkout-script', 'FEWERWC_CONSTANTS', array(
        'transactionDetailsURL' => FEWERWC_TRANSACTION_DETAILS,
        'pluginVersion' => FEWERWC_VERSION,
        'extraEvents' => get_option(FEWERWC_SETTING_EXTRA_EVENTS,FEWERWC_SETTING_EXTRA_EVENTS_DEFAULT)
        )
    );
}

add_action('wp_head', 'add_script_to_product_page');
function add_script_to_product_page()
{

?>
    <script type="text/javascript">

        // document.documentElement.style.overflow = 'scroll';
        function setLang() {
            const lang = jQuery('html').attr('lang').split('-')[0];
            const fewerCheckoutButtonElement = document.querySelector('fewer-checkout-button');
            fewerCheckoutButtonElement?.setAttribute("locale", lang === 'auto' ? 'en' : lang);
        }

        setLang();

        const htmlNode = document.querySelector('html');

        // create an observer instance https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
        var observer = new MutationObserver(function(mutationList) {
            for (const mutation of mutationList) {
                if (mutation.type === 'attributes' && mutation.attributeName == "lang") {
                    setLang();
                }
            }
        });

        // configuration of the observer:
        var config = { attributes: true }

        // pass in the target node, as well as the observer options
        observer.observe(htmlNode, config);
    </script>
    <?php
}

