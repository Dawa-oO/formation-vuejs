const cartMixin = {
    methods: {
        addToCartMixin(book) {
            this.$store.dispatch("addToCart", book);
        }
    },
};

export default cartMixin; 