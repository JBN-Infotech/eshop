<template>
  <VaCard
    color="background-element"
    class="p-3"
  >
    <div class="row">
      <div class="flex flex-col md12">
        <div class="item">
          <NavBar />
        </div>
      </div>
      <div class="flex flex-col md2">
        <div class="item">
          <SideBar/>
        </div>
      </div>
      <div class="flex flex-col md10">
        <div class="item">
          <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/books">Books</router-link>
          </nav>
          <router-view/>
        </div>
      </div>
    </div>
    <br>
    
  </VaCard>
</template>

<style>
@import "vuestic-ui/styles/grid";

.item {
  border: 1px solid var(--va-background-border);
  background-color: var(--va-background-primary);
  text-align: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
import SideBar from './components/SideBar.vue';
import NavBar from './components/NavBar.vue';

export default {
  name: 'BookList',
  components: {
    SideBar,
    NavBar,
  },
}
</script>
