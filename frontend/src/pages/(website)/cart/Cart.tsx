
import useCart from '@/common/hooks/useCart'
import { Delete } from '@/components/icons'
import { ChangeEvent } from 'react'
import { Link } from 'react-router-dom'

const CartPage = () => {
    const { data, mutate, handleQuanlityChange, calculateTotal, isLoading, isError } = useCart()
    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error</p>

    console.log(data.products);

    return (
        <div>
            <div className="container">
                <section className="cart">
                    <div className="cart-list">
                        <div className="cart-item">
                            <table className="cart-title">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                        <th>
                                        </th></tr>
                                </thead>
                                <tbody>
                                    {data?.products.map((product: any, index: number) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td><img src={product.image} className="cart-product" /></td>
                                                {/* <td>{product.name}</td> */}
                                                <td>{product.price}</td>
                                                <td className="cart-color">
                                                    <button
                                                        className='py-1 px-2 bg-emerald-100'
                                                        onClick={() =>
                                                            mutate({
                                                                action: 'DECREMENT',
                                                                productId: product.productId
                                                            })
                                                        }
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                                        </svg>

                                                    </button>

                                                    {product.quanlity}

                                                    {/* <input
                                                            type='number'
                                                            className='border border-red-100'
                                                            onInput={(e) =>
                                                                handleQuanlityChange(product.productId, e as ChangeEvent<HTMLInputElement>)
                                                            }
                                                        /> */}

                                                    <button
                                                        className='py-1 px-2 bg-emerald-100'
                                                        onClick={() =>
                                                            mutate({
                                                                action: 'INCREMENT',
                                                                productId: product.productId
                                                            })
                                                        }
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                        </svg>

                                                    </button>

                                                </td>
                                                <td className="cart-color">
                                                    {product.price * product.quanlity}
                                                </td>
                                                <td
                                                    onClick={() =>
                                                        mutate({
                                                            action: 'REMOVE',
                                                            productId: product.productId
                                                        })
                                                    }>
                                                    <img src={Delete} />
                                                </td>
                                            </tr>
                                        )
                                    })};
                                </tbody>
                            </table>
                        </div>
                        <div className="cart-totals">
                            <h3 className="cart-totals__title">Cart Totals</h3>
                            <div className="cart-total">
                                <span className="cart-total__black">Subtotal</span>
                                <span className="cart-total__grey">${calculateTotal()}</span>
                            </div>
                            <div className="cart-total">
                                <span className="cart-total__black">Total</span>
                                <span className="cart-total__yellow">Total: ${calculateTotal()}</span>
                            </div>
                            <div className="check-cart">
                                <Link to={`/order`}><button className="check-out">Check Out</button></Link>
                                {/* <button className="check-out">Check Out</button> */}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default CartPage