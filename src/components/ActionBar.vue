<template>
  <div class="action-bar flex a-center">
    <v-btn
      class="btn add-btn"
      @click="addNew"
    >
      + Add
    </v-btn>

    <div class="search-products-wrapper flex a-center main-border">
      <img
        src="@/assets/images/Magnifying_glass_icon.svg"
        alt=""
      >

      <input
        v-model="searchTerm"
        type="text"
        class="search-products"
        placeholder="search-products"
        oninput=""
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.action-bar {
  gap: 1vmin;
  margin-left: 1vmin;
  .add-btn {
    align-self: stretch;
    background-color: $clr4;
    min-width: 5vw;
  }
  .search-products-wrapper {
    border-radius: 50px;
    padding: 0 15px;
    margin-top: 3px;
    .search-products {
      border: none;
      padding: 6px;
    }
    img {
      height: 2vmin;
    }
  }
  .category-select {
    padding: 6px;
    margin-top: 3px;
    &* {
      @extend .main-border;
    }
  }
}
</style>

<script>
export default {
  name: 'ActionBar',
  data() {
    return {
      timeout: null,
      debouncedInput: '',
      options: [
        { id: 1, label: 'Name' },
        { id: 2, label: 'Recently Added' },
      ],
      searchTerm: '',
    };
  },
  methods: {
    addNew() {
      this.$store.commit('setSelectedProduct', null);
    },
  },
};
</script>
