<template>
  <VaNavbar
    color="primary"
    class="mb-3"
  >
    <template #left>
      <VaNavbarItem class="logo">
        eShop
      </VaNavbarItem>
    </template>
    <template #right>
      <VaNavbarItem class="hidden sm:block">
        Dashboard
      </VaNavbarItem>
      <VaNavbarItem class="hidden sm:block">
        Reports
      </VaNavbarItem>
      <VaNavbarItem class="hidden sm:block">
        Users
      </VaNavbarItem>
      <VaNavbarItem>
        <VaIcon name="mdi-magnify" />
      </VaNavbarItem>
      <VaNavbarItem>
        <VaIcon name="mdi-account-circle-outline" />
      </VaNavbarItem>
    </template>
  </VaNavbar>
</template>

<style scoped>
.logo {
  font-weight: 600;
  font-size: 1.5rem;
}
</style>
