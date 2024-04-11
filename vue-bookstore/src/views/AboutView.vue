<template>
  <h3 class="va-h3">
    About
  </h3>
  <BreadCrumbs/>
  <br/>
  <VaCard tag="b">
    <VaCardTitle>About me</VaCardTitle>
    <VaCardContent>
      <div class="about">
        <h1>jeffbonson@gmail.com</h1>
      </div>
    </VaCardContent>
  </VaCard>
</template>

<script>
// @ is an alias to /src
import BreadCrumbs from '../components/BreadCrumbs.vue';

export default {
  name: 'AboutUs',
  components: {
    BreadCrumbs
  },
}
</script>
