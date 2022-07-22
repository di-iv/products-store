<template>
  <div class="wrapper">
    <product-details />
  </div>
</template>

<script>
import ProductDetails from '@/components/ProductDetails';

export default {
  name: "ProductInfo",
  components: {
    ProductDetails
  },
  created() {
    if (this.$store.state.products.length === 0) {
      this.$store.dispatch('getProducts')
    }
    this.$store.commit('setSelectedProduct', this.$route.params.id);

  }
}
</script>
