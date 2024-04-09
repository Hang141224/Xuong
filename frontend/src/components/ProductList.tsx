import { useProductQuery } from "@/common/hooks/useProductQuery";
import { useLocalStorage } from "@/common/hooks/userStorage";
import { IProduct } from "@/interfaces/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

type ProductListProps = {
    featured?: boolean;
    data?: IProduct[];
};

const ProductList = ({ data, featured }: ProductListProps) => {
    const queryClient = useQueryClient();
    const [user] = useLocalStorage('user', {});
    const userId = user?.user?._id;
    const { data: products, isLoading, isError } = useProductQuery();
    const { mutate } = useMutation({
        mutationFn: async ({ productId, quanlity }: { productId: string, quanlity: number }) => {
            const { data } = await axios.post(`http://localhost:8000/api/v1/cart/add-to-cart`, {
                userId,
                productId,
                quanlity,
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart", userId],
            });
        },
    });

    const filteredProducts = featured
        ? products?.filter((product: IProduct) => product?.featured == featured)
        : data
            ? data
            : products;

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error</p>;
    return (
        <div className="container">
            <div className="product-list">
                {filteredProducts?.products?.map((product: IProduct, index: number) => {
                    return (
                        <div key={index} className="product-item">
                            <div className="product-image">
                                <img src={product?.image} alt="#" className="product__thumbnail" />
                                <span className="product-sale">{product?.discount}%</span>
                            </div>
                            <div className="product-info">
                                <h3 className="product__name">
                                    <Link to={`/products/${product._id}`} className="product__link">
                                        {product?.name}
                                    </Link>
                                </h3>
                                <a href="#" className="product__category">
                                    category
                                </a>
                                <div className="product-price">
                                    <span className="product-price__new">
                                        {product?.price - product?.price * (product?.discount / 100)}
                                    </span>
                                    <span className="product-price__old">{product?.price}</span>
                                </div>
                            </div>
                            <div className="product-actions">
                                <Link
                                    to={`/products/${product._id}`}
                                    className="btn product-action__quickview"
                                >
                                    Quick View
                                </Link>
                                <button
                                    className="btn product-action__addtocart"
                                    onClick={() => mutate({ productId: product._id, quanlity: 1 })}>
                                    Add To Cart
                                </button>
                                <div className="product-actions-more">
                                    <span className="product-action__share">Share</span>
                                    <span className="product-action__compare">Compare</span>
                                    <span className="product-action__like">Like</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

    );
};

export default ProductList;