import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, message } from 'antd';
import { useFormik } from 'formik';
import { object, string, number } from 'yup';
import { addProduct } from '../service/product';

export const AddProduct = () => {
    const navigate = useNavigate();

    const validationSchema = object({
        name: string().required('Vui lòng nhập tên sản phẩm'),
        description: string().required('Vui lòng nhập mô tả sản phẩm'),
        price: number()
            .min(0, 'Giá phải hơn hoặc bằng 0')
            .required('Vui lòng nhập giá sản phẩm'),
        quantity: number()
            .min(0, 'Số lượng phải hơn hoặc bằng 0')
            .required('Vui lòng nhập số lượng sản phẩm'),
        category: string().required('Vui lòng chọn loại sản phẩm'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: '',
            quantity: '',
            category: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await addProduct(values);
                if (response.ok) {
                    message.success('Thêm sản phẩm thành công!');
                    navigate('/');
                } else {
                    message.error('Đã có lỗi xảy ra!');
                }
            } catch (error) {
                console.error('Lỗi khi thêm sản phẩm:', error);
                message.error('Đã có lỗi xảy ra!');
            }
        },
    });

    return (
        <div style={{ padding: '20px' }}>
            <h1>Thêm Sản Phẩm</h1>
            <form onSubmit={formik.handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label>Tên sản phẩm</label>
                    <Input
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div style={{ color: 'red' }}>{formik.errors.name}</div>
                    )}
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label>Mô tả sản phẩm</label>
                    <Input
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.description && formik.errors.description && (
                        <div style={{ color: 'red' }}>{formik.errors.description}</div>
                    )}
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label>Giá sản phẩm</label>
                    <Input
                        type="number"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.price && formik.errors.price && (
                        <div style={{ color: 'red' }}>{formik.errors.price}</div>
                    )}
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label>Số lượng sản phẩm</label>
                    <Input
                        type="number"
                        name="quantity"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.quantity && formik.errors.quantity && (
                        <div style={{ color: 'red' }}>{formik.errors.quantity}</div>
                    )}
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label>Loại sản phẩm</label>
                    <Input
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.category && formik.errors.category && (
                        <div style={{ color: 'red' }}>{formik.errors.category}</div>
                    )}
                </div>

                <Button type="primary" htmlType="submit" block>
                    Thêm sản phẩm
                </Button>
            </form>

            <Link to="/" style={{ display: 'block', marginTop: '10px' }}>
                Quay lại trang danh sách sản phẩm
            </Link>
        </div>
    );
};
