// import { useProductQuery } from "@/common/hooks/useProductQuery";
import { IProduct } from "@/interfaces/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import useCart from "@/common/hooks/useCart";
import { useLocalStorage } from "@/common/hooks/userStorage";


const DetailProduct = () => {
    const { id } = useParams();
    const { mutate: mutateCart } = useCart();
    const queryClient = useQueryClient();
    const [user] = useLocalStorage('user', {});
    const userId = user?.user?._id;
    const { mutate: mutateAddToCart } = useMutation({
        mutationFn: async ({ productId, quanlity }: { productId: string, quanlity: number }) => {
            const { data } = await axios.post(`http://localhost:8000/api/v1/cart/add-to-cart`, {
                userId,
                productId,
                quanlity,
            });
            return data;
            // console.log(userId, productId, quanlity)
        },
        onSuccess: () => {
            alert("Them thanh cong");
            queryClient.invalidateQueries({
                queryKey: ["cart", userId],
            });
        },
    });

    const { data: product, isLoading } = useQuery({
        queryKey: ["PRODUCT_DETAIL"],
        queryFn: async () => {
            const { data } = await axios.get(
                `http://localhost:8000/api/v1/products/${id}`
            );
            return data;
        }
    })
    // const { data: relatedProduct } = useQuery({
    //     queryKey: ["RELATED_PRODUCT"],
    //     queryFn: async () => {
    //         const { data } = await axios.get(
    //             `http://localhost:8000/api/v1/products/${product.category}/related/${product._id}`
    //         );
    //         return data;
    //     },
    // });

    if (isLoading) return <p>Loading...</p>;
    // console.log("relatedProduct", relatedProduct);
    return (
        <div>
            <section className="Details">
                <div className="Detail-product">
                    <div className="product-list">
                        <div className="product-item__small">
                            <img src="/image/Product/product 1.png" className="img__small" />
                            <img src="/image/Product/product 2.png" className="img__small" />
                            <img src="/image/Product/product 3.png" className="img__small" />
                            <img src="/image/Product/product 4.png" className="img__small" />
                        </div>
                        <div className="product-item__big">
                            <img src={product?.image} />
                        </div>
                    </div>
                    <div className="Detail-item">
                        <h1 className="Detail-item__title">{product?.name}</h1>
                        <p className="Detail-item__price">{product?.price}</p>
                        <div className="Detail-item_star">
                            <img src="/src/assets/Sao.svg" />
                            <span className="Detail-item__review">5 Customer Review</span>
                        </div>
                        <div className="Detail-item__description">
                            <p>Setting the bar as one of the loudest speakers in its className, the</p>
                            <p>Kilburn is a compact, stout-hearted hero with a well-balanced</p>
                            <p> audio which boasts a clear midrange and extended highs for</p>
                            <p> a sound.</p>
                        </div>
                        <div className="Detail-item__Size">
                            <p>Size</p>
                            <span className="Detail-item__comau">L</span>
                            <span className="Detail-item__co">XL</span>
                            <span className="Detail-item__co">XS</span>
                        </div>
                        <div className="Detail-item__Color">
                            <p>Color</p>
                            <span className="Detail-item__mautim" />
                            <span className="Detail-item__mauden" />
                            <span className="Detail-item__maunau" />
                        </div>
                        <div className="Detail-button">
                            <button className="Detail-button__number">
                                <button
                                    className='py-1 px-2 bg-emerald-100'
                                    onClick={() =>
                                        mutateCart({
                                            action: 'DECREMENT',
                                            productId: product.productId
                                        })
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                    </svg>

                                </button>

                                {product?.quanlity}
                                {/* 1 */}
                                <button
                                    className='py-1 px-2 bg-emerald-100'
                                    onClick={() =>
                                        mutateCart({
                                            action: 'INCREMENT',
                                            productId: product.productId
                                        })
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>

                                </button>

                            </button>
                            <button className="Detail-button__add"
                                onClick={() => mutateAddToCart({ productId: product?._id, quanlity: 1 })}
                            >
                                Add To Cart
                            </button>
                            <button className="Detail-button__compare">+ Compare</button>
                        </div>
                        <div className="address-product">
                            <div className="address-list">
                                <span>SKU</span>
                                <span> : SS001</span>
                            </div>
                            <div className="address-list">
                                <span>Category</span>
                                <span> : Sofas</span>
                            </div>
                            <div className="address-list">
                                <span>Tags</span>
                                <span> : Sofa, Chair, Home, Shop</span>
                            </div>
                            <div className="address-list">
                                <span>Share</span>
                                <span> : Facebook</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <hr />

            <section className="related">
                <div className="container">
                    <div className="related-section-heading">
                        <h2 className="related-section-heading__title">Related Products</h2>
                    </div>
                    <div className="section-body">
                        <div className="product-list">

                            <Swiper
                                slidesPerView={4}
                                spaceBetween={30}
                                freeMode={true}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[FreeMode, Pagination]}
                                className="mySwiper"
                            >
                                {/* {relatedProduct && relatedProduct.map((item: IProduct) => (
                                    <SwiperSlide>
                                        <div className="product-item">
                                            <div className="product-image">
                                                <img src="../image/New/new 1.png" className="product__thumbnail" />
                                                <span className="product-sale">30%</span>
                                            </div>
                                            <div className="product-info">
                                                <h3 className="product__name">
                                                    <Link to={`/products/${item._id}`}>{item.name}</Link>
                                                </h3>
                                                <a className="product__category">Stylish cafe chair</a>
                                                <div className="product-price">
                                                    <span className="product-price__new">2.500.000đ</span>
                                                    <span className="product-price__old"><del>3.500.000đ</del></span>
                                                </div>
                                            </div>
                                            <div className="product-actions">
                                                <button className="btn product-action__quickview">Quick View</button>
                                                <button className="btn product-action__addtocart">Add To Cart</button>
                                                <div className="product-actions-more">
                                                    <span className="product-action__share">Share</span>
                                                    <span className="product-action__compare">Compare</span>
                                                    <span className="product-action__like">Like</span>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>

                                ))} */}

                            </Swiper>


                            <div className="show_more">
                                <button className="btn-show">Show More</button>
                            </div>

                        </div>
                    </div >
                </div >
            </section >
        </div >
    );
};

export default DetailProduct;