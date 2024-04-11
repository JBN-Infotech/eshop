<template>
  <div>
    <h3 class="va-h3">
      Books
    </h3>
    <BreadCrumbs/>
    <br/>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <VaCard tag="b">
        <VaCardTitle>Listing Books</VaCardTitle>
        <VaCardContent>
          <div class="va-table-responsive">
            <table class="va-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Add to Cart</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in products" :key="product.id">
                  <td>{{ product.name }}</td>
                  <td>{{ product.description }}</td>
                  <td>${{ product.price }}</td>
                  <td>
                    <VaButton 
                      icon="add"
                      color="warning"
                      icon-color="#812E9E"
                      @click="addToCart(product)"> Add to Cart </VaButton>
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </VaCardContent>
      </VaCard>
    </div>
  </div>
  <VaModal
    v-model="showModal"
    ok-text="Ok"
  >
    <h3 class="va-h3">
      Success
    </h3>
    <p>
      Item added to cart.
    </p>
  </VaModal>
</template>

<script>
// @ is an alias to /src
import BreadCrumbs from './BreadCrumbs.vue';

export default {
  name: 'BookList',
  components: {
    BreadCrumbs
  },
  data() {
    return {
      products: [],
      loading: true,
      showModal: false,
    };
  },
  mounted() {
    // Fetch products from an API or use mock data
    // For simplicity, let's assume products are fetched from an API
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      // Simulate fetching products from an API
      setTimeout(() => {
        this.products = [
          { id: 1, name: 'Product 1', description: 'Description for Product 1', price: 10 },
          { id: 2, name: 'Product 2', description: 'Description for Product 2', price: 20 },
          { id: 3, name: 'Product 3', description: 'Description for Product 3', price: 30 },
          // Add more products as needed
        ];
        this.loading = false;
      }, 1000); // Simulate 1 second delay
    },
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
      console.log('Adding to cart:', product);
      console.log('cartItems=', this.$store.getters.cartItems);
      this.showModal = true;
    }
  }
};
</script>

<style scoped>
/* Add CSS styles as needed */
</style>
