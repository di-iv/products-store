<template>
  <ul
    v-if="productListPage.length"
    class="pagination"
  >
    <li class="page-item">
      <button
        v-if="page !== 0"
        type="button"
        class="page-link"
        @click="page--"
      >
        Previous
      </button>
    </li>
    <li class="page-item">
      <button
        v-for="(idx, pageNumber) in pagesCount"
        :key="idx"
        type="button"
        class="page-link"
        @click="page = pageNumber"
      >
        {{ pageNumber + 1 }}
      </button>
    </li>
    <li class="page-item">
      <button
        v-if="page < pagesCount-1"
        type="button"
        class="page-link"
        @click="page++"
      >
        Next
      </button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.pagination {
	display: flex;
	list-style-type: none;
	margin: auto;
	li {
		.page-link {
			padding: 0 5px;
			margin-left: 5px;
			display: inline-block;
			font-size: 20px;
			color: #29b3ed;
			font-weight: 500;
		}
	}
}
</style>

<script>
export default {
	name: 'Pagination',
	computed: {
		getPaginationData() {
			return this.$store.getters.getPaginationData;
		},
		productListPage() {
			return this.$store.getters.productListPage;
		},
		pagesCount() {
			const count = Math.ceil(
				this.getPaginationData.productAmount / this.getPaginationData.limit
			);
			console.log(
				"🚀 ~ file: Pagination.vue ~ line 63 ~ pagesCount ~ count",
				count
			);
			return count;
		},
		page: {
			get() {
				return this.getPaginationData.page;
			},
			set(v) {
				this.$store.commit("setPage", v);
			},
		},
	},
};
</script>
