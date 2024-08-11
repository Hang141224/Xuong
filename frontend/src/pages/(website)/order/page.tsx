import useCart from "@/common/hooks/useCart";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useLocalStorage } from "@/common/hooks/userStorage";
import { IProduct } from "@/common/types/products";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
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
            // console.log(order)
            const { data } = await axios.post("http://localhost:8000/api/v1/orders", order);
            return data;
        },
        onSuccess: () => {
            alert("Đặt hàng thành công");
            navigate("/");
        },
    });

    const onSubmit = (formData: object) => {
        mutate({
            userId,
            items: data?.products.map((item: any) => {
                return {
                    name: item.productId.name,
                    price: item.productId.price,
                    quantity: item.quanlity
                }
            }),
            totalPrice: calculateTotal(),
            customerInfo: formData,
        });
    };

    // console.log(data?.products)

    return (
        <div className="container mx-auto">
            <h1>Order</h1>
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div>
                            <label>Name</label>
                            <Input
                                placeholder="Tên"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && (
                                <span className='text-danger'>{errors.name.message}</span>
                            )}

                        </div>
                        <div>
                            <label>Số điện thoại</label>
                            <Input
                                type="tel"
                                placeholder="Số điện thoại"
                                {...register("phone", { required: "Phone is required" })}
                            />
                            {errors.phone && (
                                <span className='text-danger'>{errors?.phone.message}</span>
                            )}
                        </div>

                        <div>
                            <label>Email</label>
                            <Input
                                type="email"
                                placeholder="Email của bạn"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors?.email?.message && (
                                <span className='text-danger'>{errors.email.message}</span>
                            )}

                        </div>
                        <Button type="submit">Hoàn thành đơn hàng</Button>
                    </form>
                </div>

                <div className="col-span-4">
                    <h2 className="text-danger">Thanh toán</h2>
                    {data?.products?.map((item: IProduct) => (
                        <div key={item._id} className="border-b py-2">
                            <h5>{item.productId.name}</h5>
                            <p>Giá: {item.productId?.price}</p>
                            <p>Số lượng: {item.quanlity}</p>
                        </div>
                    ))}
                    <p className="mt-4">
                        <strong className="mr-2">Số lượng sản phẩm:</strong>
                        {data?.products ? data?.products.length : 0}
                    </p>
                    <p>
                        <strong className="mr-2">Tổng tiền:</strong>{" "}
                        {calculateTotal()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
