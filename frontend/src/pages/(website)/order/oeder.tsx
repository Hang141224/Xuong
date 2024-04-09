
import useCart from "@/common/hooks/useCart";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useLocalStorage } from "@/common/hooks/userStorage";
import { IProduct } from "@/common/types/products";

const OrderPage = () => {
    const { register, handleSubmit } = useForm();
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const { data, calculateTotal } = useCart();
    const { mutate } = useMutation({
        mutationFn: async (order: {
            userId: string;
            items: [];
            totalPrice: number;
            customerInfo: object;
        }) => {
            const { data } = await axios.post(
                "http://localhost:8000/api/v1/orders",
                order,
            );
            return data;
        },
        onSuccess: () => {
            // navigate("/thankyou")
            alert("Đặt hàng thành công");
        },
    });

    const onSubmit = (formData: object) => {
        mutate({
            userId,
            items: data?.products,
            totalPrice: calculateTotal(),
            customerInfo: formData,
        });
    };

    return (
        <section className="Check-out">
            <div className="checkOut-list">
                <div className="checkOut-bill">
                    <div className="checkOut-bill__title">
                        <h1>Billing details</h1>
                        <form className="checkOut-bill-form">
                            <div className="checkOut-bill__name">
                                <div className="checkOut-bill__first">
                                    <label htmlFor={''}>First Name</label>
                                    <input type="text" name={''} />
                                </div>
                                <div className="checkOut-bill__first">
                                    <label htmlFor={''}>Last Name</label>
                                    <input type="text" name={''} />
                                </div>
                            </div>
                            <div className="checkOut-bill__item">
                                <label htmlFor={''}>Company Name (Optional)</label>
                                <input type="text" className="checkOut-bill__input" />
                            </div>
                            <div className="checkOut-bill__item">
                                <label htmlFor={''}>Country / Region</label>
                                <select className="checkOut-bill__input">
                                    <option className="checkOut-bill__option">Ha Noi</option>
                                    <option className="checkOut-bill__option">Thai Binh</option>
                                    <option className="checkOut-bill__option">Da Nang</option>
                                </select>
                            </div>
                            <div className="checkOut-bill__item">
                                <label htmlFor={''}>Street address</label>
                                <input type="text" className="checkOut-bill__input" />
                            </div>
                            <div className="checkOut-bill__item">
                                <label htmlFor={''}>Town / City</label>
                                <input type="text" className="checkOut-bill__input" />
                            </div>
                            <div className="checkOut-bill__item">
                                <label htmlFor={''}>Province</label>
                                <select className="checkOut-bill__input">
                                    <option className="checkOut-bill__option">Ha Noi</option>
                                    <option className="checkOut-bill__option">Thai Binh</option>
                                    <option className="checkOut-bill__option">Da Nang</option>
                                </select>
                            </div>
                            <div className="checkOut-bill__item">
                                <label htmlFor={''}>ZIP code</label>
                                <input type="number" className="checkOut-bill__input" />
                            </div>
                            <div className="checkOut-bill__item">
                                <label htmlFor={''}>Phone</label>
                                <input type="number" className="checkOut-bill__input" />
                            </div>
                            <div className="checkOut-bill__item">
                                <label htmlFor={''}>Email address</label>
                                <input type="email" className="checkOut-bill__input" />
                            </div>
                            <div className="checkOut-bill__item">
                                <input type="text" placeholder="Additional information" className="checkOut-bill__input" />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="checkOut-products">
                    <div className="checkOut-totals">
                        <div className="checkOut-totals__title">
                            <span>Products</span>
                            <span>Subtotal</span>
                        </div>
                        <div className="checkOut-totals__content">
                            <span className="checkOut-totals__grey">Asgaard sofa</span>
                            <span className="checkOut-totals__number"> x 1</span>
                            <span>25.000.000đ</span>
                        </div>
                        <div className="checkOut-totals__content">
                            <span>Subtotal</span>
                            <span>25.000.000đ</span>
                        </div>
                        <div className="checkOut-totals__content">
                            <span>Total</span>
                            <span className="checkOut-totals__yellow">25.000.000đ</span>
                        </div>
                    </div>
                    <hr />
                    <div className="checkOut-content">
                        <div className="checkOut-radio">
                            <input type="radio" className="checkOut-input" />
                            <label>Direct Bank Transfer</label>
                        </div>
                        <div className="checkOut-content__grey">
                            Make your payment directly into our bank account. Please use your Order ID as the payment
                            reference. Your order will not be shipped until the funds have cleared in our account.
                        </div>
                        <div className="checkOut-radio">
                            <input type="radio" />
                            <label htmlFor={''}>Direct Bank Transfer</label>
                        </div>
                        <div className="checkOut-radio">
                            <input type="radio" />
                            <label htmlFor={''}>Cash On Delivery</label>
                        </div>
                        <div className="checkOut-content">
                            Your personal data will be used to support your experience throughout this website, to manage
                            access to your account, and for other purposes described in our
                            <span className="checkOut-content__color">privacy policy</span>.
                        </div>
                    </div>
                    <div className="checkOut-btn">
                        <button type="button" className="checkOut-place">Place order</button>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default OrderPage;
