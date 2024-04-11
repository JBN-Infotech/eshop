<template>
  <VaBreadcrumbs color="primary">
    <VaBreadcrumbsItem 
      v-for="item in breadCrumbs" 
      :key="item.path" 
      :label="item.name" 
      @click="navigateTo(item.path)" />
  </VaBreadcrumbs>
</template>

<script>
import { routes } from '@/router';

export default {
  name: 'BreadCrumbs',
  data() {
    return {
      breadCrumbs: [],
    };
  },
  created() {
    this.getBredCrumbs();
  },
  methods: {
    /** Function to navigate to the path when clicks on breadcrumb item links **/
    navigateTo(path) {
      this.$router.push(path);
    },

    /** Function to prepare the breadcrumbs */
    getBredCrumbs() {
      const currentRoute = routes.find((item) => item.path === this.$route.path);
      currentRoute.breadCrumbs.forEach((breadCrumbItem) => {
        const route = routes.find((routeItem) => routeItem.path === breadCrumbItem);
        this.breadCrumbs.push({name: route.name, path: route.path});
      })
      this.breadCrumbs.push({name: currentRoute.name, path: currentRoute.path});
    }
  }
}
</script>
