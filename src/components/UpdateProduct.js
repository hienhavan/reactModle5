import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ProductService from '../service/product';
import { useNavigate, useParams } from 'react-router-dom';

const { updateProduct, getProduct } = ProductService;

const UpdateProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
    });
    const navigate = useNavigate();
    const { id } = useParams();

    const validationSchema = Yup.object({
        name: Yup.string().required('Vui lòng nhập tên sản phẩm'),
        description: Yup.string().required('Vui lòng nhập mô tả sản phẩm'),
        price: Yup.number()
            .min(0, 'Giá phải lớn hơn hoặc bằng 0')
            .required('Vui lòng nhập giá sản phẩm'),
        quantity: Yup.number()
            .min(0, 'Số lượng phải lớn hơn hoặc bằng 0')
            .required('Vui lòng nhập số lượng sản phẩm'),
        category: Yup.string().required('Vui lòng chọn loại sản phẩm'),
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProduct(id);
                if (response.ok) {
                    setProduct({
                        name: response.data.name || '',
                        description: response.data.description || '',
                        price: response.data.price || '',
                        quantity: response.data.quantity || '',
                        category: response.data.category || '',
                    });
                } else {
                    console.error('Error fetching product:', response.error);
                }
            } catch (err) {
                console.error('Error fetching product:', err);
            }
        };

        fetchProduct();
    }, [id]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await updateProduct({ id, ...values });
            if (response.ok) {
                navigate('/');
            } else {
                console.error('Error updating product:', response.error);
            }
        } catch (error) {
            console.error('Error updating product:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Cập nhật sản phẩm</h1>
            <Formik
                enableReinitialize
                initialValues={product}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Tên sản phẩm</label>
                            <Field
                                type="text"
                                name="name"
                                id="name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="name" component="div" className="text-sm text-red-600" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="block text-lg font-medium text-gray-700">Mô tả</label>
                            <Field
                                as="textarea"
                                name="description"
                                id="description"
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="description" component="div" className="text-sm text-red-600" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="price" className="block text-lg font-medium text-gray-700">Giá</label>
                            <Field
                                type="number"
                                name="price"
                                id="price"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="price" component="div" className="text-sm text-red-600" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="quantity" className="block text-lg font-medium text-gray-700">Số lượng</label>
                            <Field
                                type="number"
                                name="quantity"
                                id="quantity"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="quantity" component="div" className="text-sm text-red-600" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="category" className="block text-lg font-medium text-gray-700">Loại sản phẩm</label>
                            <Field
                                type="text"
                                name="category"
                                id="category"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="category" component="div" className="text-sm text-red-600" />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateProduct;
