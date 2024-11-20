
import { selector } from 'recoil';
import { productsState } from './Atoms';
import { deleteProduct } from '../service/product';

export const ProductDeleteSelector = selector({
    key: 'productDeleteSelectorUnique',
    get: ({ get }) => {
        const ListProducts = get(productsState);
        return ListProducts;
    },
    set: ({ set, get }, productId) => {
        const ListProducts = get(productsState);
        try {
            deleteProduct(productId);
            const updatedList = ListProducts.filter(product => product.id !== productId);
            set(productsState, updatedList);
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
        }
    },
});


