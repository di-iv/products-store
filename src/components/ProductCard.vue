<template>
  <div class="product-card main-border flex j-between">
    <img
      class="img"
      :src="product.image || defaultUrl"
      alt=""
    >
    <div class="details flex column j-start">
      <h4 class="title">
        {{ product.title }}
      </h4>
      <p class="description">
        {{ product.description }}
      </p>
    </div>
    <router-link
      class="btn"
      :to="{name: 'Product', params: {id: product.id}}"
    >
      Details
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.product-card {
  max-height: 25vh;
  margin: 1vmin;
  text-transform: capitalize;
  .img {
    margin: 2vh;
    max-height: 23vh;
    max-width: 23vh;
  }
  .details {
    flex: 1;
    text-align: left;
    .description {
      -webkit-line-clamp: 3;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  .btn {
    background-color: $clr3;
    max-height: 5vh;
    align-self: flex-end;
    margin: 2vmin;
  }
}
</style>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      defaultUrl:
        'https://wtwp.com/wp-content/uploads/2015/06/placeholder-image-300x225.png',
    };
  },
  methods: {
    setSelectedProduct() {
      this.$store.commit('setSelectedProduct', this.product.id);
    },
  },
};
</script>
