import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Card, Button, Typography, Spin, message } from 'antd';
import ProductService from '../service/product';
import { productsState } from '../recoil/Atoms';
import { ProductDeleteSelector } from '../recoil/Selector';
import { Link } from 'react-router-dom';

const { listProducts } = ProductService;
const { Title, Paragraph } = Typography;

const ProductList = () => {
    const [products, setProducts] = useRecoilState(productsState);
    const [loading, setLoading] = React.useState(false);
    const setDeleteProduct = useSetRecoilState(ProductDeleteSelector);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await listProducts();
                if (Array.isArray(response)) {
                    setProducts(response);
                } else if (response && Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    console.error("Dữ liệu không hợp lệ:", response);
                }
            } catch (err) {
                console.error('Lỗi:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [setProducts]);

    const handleDelete = async (productId) => {
        try {
            setDeleteProduct(productId);
            message.success('Sản phẩm đã được xóa');
        } catch (err) {
            message.error('Lỗi khi xóa sản phẩm');
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Spin spinning={loading} size="large" tip="Đang tải sản phẩm...">
                <div className="mb-6 text-center">
                    <Link to={'/AddProduct'}>
                        <Button type="primary" size="large">
                            Thêm sản phẩm
                        </Button>
                    </Link>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <Card key={product.id} hoverable className="shadow-lg">
                                <Title level={4}>{product.name}</Title>
                                <Paragraph ellipsis>{product.description}</Paragraph>

                                <div className="flex justify-between mt-4">
                                    <Link to={`/EditProduct/${product.id}`}>
                                        <Button type="danger" block>
                                            Chỉnh sửa
                                        </Button>
                                    </Link>

                                    <Button
                                        type="danger"
                                        block
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Xóa sản phẩm
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-xl">Không có sản phẩm để hiển thị.</p>
                )}
            </Spin>
        </div>
    );
};

export default ProductList;
