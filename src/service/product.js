import { data } from "autoprefixer";
import axios from "axios";

export const listProducts = async () => {
    try {
        const response = await axios.get(`http://localhost:3005/products`);
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error(error);
        return error.response?.data?.errors?.[0] || 'Unknown error';
    }
};

export const addProduct = async ({ name, description, price, quantity, category }) => {
    try {
        const response = await axios.post(`http://localhost:3005/products`,
            {
                name,
                description,
                price,
                quantity,
                category
            }

        );
        return { ok: true, data: await response.data };
    } catch (error) {
        const errorMessage = error.response?.data?.errors?.[0] || error.message || 'Unknown error';
        return { ok: false, error: errorMessage };
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3005/products/${id}`);
        return response.data
    } catch (error) {
        const errorMessage = error.response?.data?.errors?.[0] || error.message || 'Unknown error';
        return { ok: false, error: errorMessage };
    }
}

export const updateProduct = async ({ id, name, description, price, quantity, category }) => {
    try {
        const response = await axios.put(`http://localhost:3005/products/${id}`,
            {
                name,
                description,
                price,
                quantity,
                category
            }

        );
        return { ok: true, data: await response.data };
    } catch (error) {
        const errorMessage = error.response?.data?.errors?.[0] || error.message || 'Unknown error';
        return { ok: false, error: errorMessage };
    }
}

export const getProduct = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3005/products/${id}`);
        return { ok: true, data: await response.data }
    } catch (error) {
        const errorMessage = error.response?.data?.errors?.[0] || error.message || 'Unknown error';
        return { ok: false, error: errorMessage };
    }
}

export default { listProducts, addProduct, deleteProduct, getProduct, updateProduct };