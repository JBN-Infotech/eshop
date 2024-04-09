<template>
  <div class="h-52">
    <VaSidebar
      :minimized="minimized"
      width="100%"
      minimized-width="64px"
    >
      <router-link
        v-for="item in items"
        :key="item.title"
        :to="item.path">
        <VaSidebarItem :active="isActive(item.path)">
          <VaSidebarItemContent>
            <VaIcon :name="item.icon" />
            <VaSidebarItemTitle>
              {{ item.title }}
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        </router-link>
    </VaSidebar>
  </div>

  <VaCheckbox
    v-model="minimized"
    class="mt-2"
    label="Minimized"
  />
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Home", icon: "home", path: '/' },
        { title: "Books", icon: "books", active: true, path: '/books'},
        { title: "About Us", icon: "loop", path: '/about' },
      ],
      minimized: false,
    };
  },
  methods: {
    isActive(path) {
      // Check if the current route's path matches the given path
      return this.$route.path === path;
    }
  }
};
</script>
