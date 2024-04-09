import { Link } from 'react-router-dom'
import Pagination from '../../../../components/Pagination'
import { IProduct } from '@/common/types/products'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useLocalStorage } from '@/common/hooks/userStorage'
type ProductListProps = {
    products?: IProduct[]
    pagination?: {
        currentPage: number
        totalPages: number
        totalItems: number
    }
}

const ProductList = ({ pagination }: ProductListProps) => {
    const { data: products } = useQuery({
        queryKey: ['GET_PRODUCTS'],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8000/api/v1/products`);
            return data;
        }
    })
    const queryClient = useQueryClient();
    const [user] = useLocalStorage('user', {});
    const userId = user?.user?._id;
    const { mutate } = useMutation({
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


    // const { totalPages } = pagination || { totalPages: 1 }
    return (
        <div className='container'>
            <div className='product-list'>
                {products?.map((product: IProduct, index: number) => {
                    return (
                        <div key={index} className='product-item'>
                            <div className='product-image'>
                                <img src={product?.image} alt='#' className='product__thumbnail' />
                                <span className='product-sale'>{product?.discount}%</span>
                            </div>
                            <div className='product-info'>
                                <h3 className='product__name'>
                                    <Link to={`/products/${product._id}`} className='product__link'>
                                        {product?.name}
                                    </Link>
                                </h3>
                                <a href='#' className='product__category'>
                                    category
                                </a>
                                <div className='product-price'>
                                    <span className='product-price__new'>
                                        {product?.price - product?.price * (product?.discount / 100)}
                                    </span>
                                    <span className='product-price__old'>{product?.price}</span>
                                </div>
                            </div>
                            <div className='product-actions'>
                                <Link to={`/products/${product._id}`} className='btn product-action__quickview'>
                                    Quick View
                                </Link>
                                <button
                                    className='btn product-action__add_to_cart'
                                    onClick={() => mutate({ productId: product?._id, quanlity: 1 })}
                                >
                                    Add To Cart
                                </button>
                                <div className='product-actions-more'>
                                    <span className='product-action__share'>Share</span>
                                    <span className='product-action__compare'>Compare</span>
                                    <span className='product-action__like'>Like</span>
                                </div>
                            </div>
                        </div>
                    )
                })}

                {/* <div className='pagination'>
                    <Pagination totalPages={totalPages} />
                </div> */}
            </div>
        </div>
    )
}

export default ProductList