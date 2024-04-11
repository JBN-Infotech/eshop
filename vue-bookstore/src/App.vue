<script setup>
  import { ref } from 'vue';
  import { useBreakpoint } from 'vuestic-ui';

  const showSidebar = ref(true);

  const breakpoints = useBreakpoint();
</script>


<template>
  <VaLayout 
    style="height: 500px"
    :left="{ absolute: breakpoints.smDown }"
  >
    <template #top>
      <VaNavbar color="primary" class="py-2">
        <template #left>
          <VaButton :icon="showSidebar ? 'menu_open' : 'menu'" @click="showSidebar = !showSidebar" />
        </template>
        <template #center>
          <VaNavbarItem class="font-bold text-lg">
            eShop
          </VaNavbarItem>
        </template>
        <template #right>
          <VaDropdown>
            <template #anchor>
              <VaButton 
                icon="book"
                color="warning"
                icon-color="#812E9E"
                @click="showCart()"> Cart ({{ this.$store.getters.cartItems.length }})</VaButton>
            </template>
            <VaModal v-model="showModal" ok-text="Ok">
                <h3 class="va-h3">
                  Cart
                </h3>
                <div class="va-table-responsive">
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
                      <tr v-for="product in this.$store.getters.cartItems" :key="product.id">
                        <td>{{ product.name }}</td>
                        <td>{{ product.description }}</td>
                        <td>${{ product.price }}</td>
                        <td>1</td>
                        <td>${{ product.price }}</td>
                        <td>
                          <VaButton 
                            icon="delete"
                            color="danger"
                            icon-color="#FFF"
                          > Remove</VaButton>
                          </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </VaModal>
        
            <VaDropdownContent> 
              
            </VaDropdownContent>
          </VaDropdown>
          
        </template>
      </VaNavbar>
    </template>

    <template #left>
      <VaSidebar v-model="showSidebar">
        <SideBar />
      </VaSidebar>
    </template>

    <template #content>
      <main class="p-4">
        <router-view/>
      </main>
    </template>
  </VaLayout>
</template>

<script>
import SideBar from './components/SideBar.vue';

export default {
  name: 'BookList',
  components: {
    SideBar,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    showCart() {
      this.showModal = true;
    } 
  }
};
</script>


<style scoped>
main {
  padding: 0 30px;
}
</style>
