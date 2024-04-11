<template>
  <VaCardTitle>{{ product.name }}</VaCardTitle>
  <VaCardContent>
    <VaImage
      fit="contain"
      class="max-h-32 col-span-1 bg-gray-300"
      src="https://picsum.photos/1500"
    />
    <h6 class="va-h6">
      {{product.description}}
    </h6>
    <VaRating v-model="value" clearable color="success"/>
  </VaCardContent>
  <VaCardActions align="stretch" vertical>
    <VaButton 
      icon="add"
      color="warning"
      icon-color="#812E9E"
      @click="addToCart(product)">Add to Cart - ${{ product.price }}</VaButton>
    
  </VaCardActions>
</template>

<script>
import { useToast } from 'vuestic-ui';

export default {
  setup() {
    const { notify } = useToast();

    const showNotification = (product) => {
      notify({
        title: `Added to Cart`,
        message: `"${product.name}" has been successfully added to the cart.`,
        color: 'success', // or 'error', 'warning', 'info'
        duration: 5000, // in milliseconds
      });
    };

    return { showNotification };
  },
  data() {
    return {
      value: 4,
    };
  },
  name: 'BookListItem',
  props: {
    product: {
      id: Number,
      name: String,
      description: String,
      price: Number,
    },
    callback: {
      type: Function,
      required: true
    },
  },
  methods: {
    itemCartCount() {
      const cartItems = this.$store.getters.cartItems;
      if (!cartItems) {
        return 0;
      }
      if (cartItems) {
        const inCart = this.$store.getters.cartItems.find((item) => item.id === this.product.id);
        return inCart ? inCart.count : 0;
      }
    },
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
      this.itemCartCount();
      this.showNotification(product);
      this.callback(this.product);
    },
  },
}
</script>
