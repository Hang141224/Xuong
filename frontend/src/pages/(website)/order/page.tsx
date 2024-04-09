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
        <div className="container mx-auto">
            <h1>Order</h1>
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div>
                            <label>Name</label>
                            <Input
                                placeholder="Tên"
                                {...register("name")}
                            />
                        </div>
                        <div>
                            <label>Số điện thoại</label>
                            <Input
                                type="tel"
                                placeholder="Số điện thoại"
                                {...register("phone")}
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <Input
                                type="email"
                                placeholder="Email của bạn"
                                {...register("email")}
                            />
                        </div>
                        <Button type="submit">Hoàn thành đơn hàng</Button>
                    </form>
                </div>
                <div className="col-span-4">
                    {data?.products?.map((item: IProduct) => (
                        <div key={item._id} className="border-b py-4">
                            <h4>{item.name}</h4>
                            <p>Giá: {item.price}</p>
                            <p>Số lượng:{item.quanlity}</p>
                        </div>
                    ))}
                    <p className="mt-5">
                        <strong className="mr-2">Sản phẩm:</strong>
                        {data?.products ? data?.products.length : 0}
                    </p>
                    <p>
                        <strong className="mr-2">tổng tiền:</strong>{" "}
                        {calculateTotal()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
