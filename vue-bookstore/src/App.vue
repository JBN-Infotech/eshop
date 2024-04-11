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
         <Cart />
          
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
import Cart from './components/Cart.vue'

export default {
  name: 'BookList',
  components: {
    SideBar,
    Cart,
  },
  data() {
    
  },
  methods: {
    
  }
};
</script>


<style scoped>
main {
  padding: 0 30px;
}
</style>
