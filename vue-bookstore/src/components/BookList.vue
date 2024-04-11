<template>
  <div>
    <h3 class="va-h3">
      Books
    </h3>
    <BreadCrumbs/>
    <br/>
    <VaCard tag="b">
      <VaCardTitle>Listing Books</VaCardTitle>
      <VaCardContent>
        <div v-if="loading"><VaProgressBar indeterminate /></div>
        <div v-else>
          <div class="flex flex-wrap gap-5 book-list">
            <VaCard v-for="product in products" :key="product.id" square outlined>
              <BookListItem :product="product" :callback="handleCallback"/>
            </VaCard>
          </div>
        </div>
      </VaCardContent>
    </VaCard>
  </div>
</template>

<script>
// @ is an alias to /src
import BreadCrumbs from './BreadCrumbs.vue';
import BookListItem from './BookListItem.vue';
export default {
  name: 'BookList',
  components: {
    BreadCrumbs,
    BookListItem,
  },
  data() {
    return {
      products: [],
      loading: true,
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
          { id: 4, name: 'Product 4', description: 'Description for Product 4', price: 10 },
          { id: 5, name: 'Product 5', description: 'Description for Product 5', price: 20 },
          { id: 6, name: 'Product 6', description: 'Description for Product 6', price: 30 },
          // Add more products as needed
        ];
        this.loading = false;
      }, 1000); // Simulate 1 second delay
    },
    cartItemCount(product){
      const inCart = this.$store.getters.cartItems.find((item) => item.id === product.id);
      return inCart ? inCart.count : 0;
    },
    handleCallback(data) {
      console.log('Received data from child:', data);
    },
  }
};
</script>

<style scoped>
  .book-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .book-list .va-card {
    flex: 0 0 calc(20% - 20px); /* Adjust the width and margin as needed */
    margin-bottom: 20px; /* Adjust the margin as needed */
  }
</style>
