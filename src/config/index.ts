const config = {
    port : process.env.PORT || 4000,
    secret: process.env.SECRET || 'asd123',
    apikey: process.env.APIKEY || '',
    token : process.env.TOKEN || '',
    urlCheckout:process.env.CHECKOUT_URL || ''
};

export default config;
