<?php
const FEWERWC_ENV                     = 'prod';
if(FEWERWC_ENV === 'localhost'){
    define("FEWERWC_SERVER_URI", 'http://localhost:8000');
    define("FEWERWC_MERCHANT_DASHBOARD", 'http://localhost:3001');
}
elseif (FEWERWC_ENV === 'docker'){
    define("FEWERWC_SERVER_URI", 'http://host.docker.internal:8000');
    define("FEWERWC_MERCHANT_DASHBOARD", 'http://host.docker.internal:3001');
}
elseif (FEWERWC_ENV === 'prod'){
    define("FEWERWC_SERVER_URI", 'https://backend.sa.amwal.tech');
    define("FEWERWC_MERCHANT_DASHBOARD", 'https://merchant.sa.amwal.tech');
}
else{
    define("FEWERWC_SERVER_URI", 'https://'.FEWERWC_ENV.'-backend.sa.amwal.tech');
    define("FEWERWC_MERCHANT_DASHBOARD", 'https://'.FEWERWC_ENV.'-merchant.sa.amwal.tech');
}

const FEWERWC_TRANSACTION_DETAILS     = FEWERWC_SERVER_URI . '/transactions/';
const FEWERWC_REFUND_HOST             = FEWERWC_TRANSACTION_DETAILS . 'refund/';