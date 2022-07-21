import fakeStoreApi from '@/services/api';

export default class Products {
  static async get() {
    const result = await fakeStoreApi.get('/products')
    return result.data;
  }
}
