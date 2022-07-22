import Products from '@/services/Products';
import Vue from 'vue';
import Vuex from 'vuex';

function paginate(array, page_size, page_number) {
  return array.slice(
    page_number * page_size,
    page_number * page_size + page_size
  );
}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    filteredProducts: [],
    page: 0,
    limit: 4,
    selectedProductId: null,
    searchTerm: '',
    category: 1,
  },
  getters: {
    getCategory({ category }) {
      return category;
    },
    getSearchTerm({ searchTerm }) {
      return searchTerm;
    },
    productListPage(state) {
      let { category, searchTerm, products, limit, page } = state;
      const sortByField = category === 1 ? 'name' : 'dateAdded';
      const arraySortByCategory = products.sort(
        (a, b) => a[sortByField] - b[sortByField]
      );

      const unfilteredPage = paginate(arraySortByCategory, limit, page);

      if (!searchTerm) {
        state.filteredProducts = [];
        return unfilteredPage;
      }
      if (!state.filteredProducts.length) page = 0;
      state.filteredProducts = products.filter(
        (p) => p.name.includes(searchTerm) || p.description.includes(searchTerm)
      );

      const filteredPage = paginate(state.filteredProducts, limit, page);

      return filteredPage;
    },
    selectedProduct({ products, selectedProductId }) {
      if (!selectedProductId) return null;
      const targetProduct = products.find((p) => p.id === selectedProductId);
      return targetProduct;
    },
    getPaginationData({ products, filteredProducts, limit, page }) {
      return {
        productAmount: filteredProducts.length
          ? filteredProducts.length
          : products.length,
        limit,
        page,
      };
    },
  },
  mutations: {
    setSelectedProduct(state, productID) {
      if (!productID) {
        state.selectedProductId = {
          id: null,
          name: '',
          description: '',
          price: 0,
          imageUrl: '',
        };
        return;
      }
      state.selectedProductId = productID;
    },
    updateProducts({ products }, product) {
      //check if idx exists...if yes override else push
      const productIdx = products.findIndex((p) => p.id === product.id);
      if (productIdx === -1) products.unshift(product);
      Vue.set(products, productIdx, product);
    },
    setSearchTerm(state, newSearchTerm) {
      state.searchTerm = newSearchTerm;
    },
    toggleCategory(state) {
      state.category = state.category === 1 ? 2 : 1;
    },
    setPage(state, newPage) {
      state.page = newPage;
    },
    setProducts(state, products) {
      state.products = products;
    }
  },
  actions: {
    async getProducts({commit}) {
      const products = await Products.get();
      commit('setProducts', products);
    }
  },
  modules: {},
});
