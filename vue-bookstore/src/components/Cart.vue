<template>
  <VaButton 
    icon="book"
    color="warning"
    icon-color="#812E9E"
    @click="showCart()">
      {{cartLabel()}}
  </VaButton>
<VaModal v-model="showModal" ok-text="Ok">
    <h3 class="va-h3">
      Cart
    </h3>
    <div v-if="cartItems.length <= 0">
      <VaAlert color="warning" class="mb-6">
        No items in cart
      </VaAlert>
    </div>
    <div v-else class="va-table-responsive">
      <table class="va-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in cartItems" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>${{ product.price }}</td>
            <td>{{ product.count }}</td>
            <td>${{ product.total }}</td>
            <td>
              <VaButton 
                icon="delete"
                color="danger"
                icon-color="#FFF"
              > Remove</VaButton>
              </td>
          </tr>
          <tr>
            <td><b>Total</b></td>
            <td></td>
            <td></td>
            <td>{{this.totalItems()}}</td>
            <td><b>${{this.grandTotal()}}</b></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </VaModal>
</template>
<script>
export default {
  name: 'ShoppingCart',
  components: {},
  data() {
    return {
      cartItems: this.$store.getters.cartItems,
      showModal: false,
    };
  },
  
  methods: {
    showCart() {
      this.showModal = true;
    },
    grandTotal() {
      return this.cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);
    },
    totalItems() {
      return this.cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.count, 0);
    },
    cartLabel() {
      const label = 'Cart';
      const totalItems = this.totalItems();
      return totalItems <= 0 ? label : `${label} (${totalItems})`;
    }
  }
};
</script>
