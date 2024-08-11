import LayoutAdmin from "@/pages/(dashboard)/layout";
import Signin from "@/pages/(website)/(auth)/Signin";
import AboutPage from "@/pages/(website)/about/page";
import ContactPage from "@/pages/(website)/contact/page";
import HomePage from "@/pages/(website)/home/page";
import LayoutWebsite from "@/pages/(website)/layout";
import OrderPage from "@/pages/(website)/order/page";
import CategoryDetail from "@/pages/(website)/product/category/detail/page";
import DetailProduct from "@/pages/(website)/product/detail/page";
import ShopPage from "@/pages/(website)/product/page";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CartPage from "@/pages/(website)/cart/Cart";
import NotFound from "@/pages/(website)/404/notFound";
import '../styles/style.scss';
import axios from "axios";
import { IProduct } from "@/interfaces/product";
import { useEffect, useState } from "react";
import ProductsList from "@/pages/(dashboard)/product/_components/ProductList";
import ProductEdit from "@/pages/(dashboard)/product/_components/ProductEdit";
import ProductAdd from "@/pages/(dashboard)/product/_components/Productadd";
import CategoryList from "@/pages/(dashboard)/categories/CategoryList";
import CategoryAdd from "@/pages/(dashboard)/categories/CategoryAdd";
import CategoryEdit from "@/pages/(dashboard)/categories/CategoryEdit";
import Signup from "@/pages/(website)/(auth)/Signup";

const Router = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`http://localhost:8000/api/v1/products`);
            setProducts(data);
        })();
    }, []);

    const onHandleRemove = async (id: number) => {
        try {
            const confirm = window.confirm('Ban co chac chan muon xoa san pham nay ?')
            if (confirm) {
                await axios.delete(`http://localhost:8000/api/v1/products/${id}`);
                setProducts(products.filter((item) => item._id !== id));
                alert('Xóa sản phẩm thành công');

            }
        } catch (error) {
            console.log(error);

        }
    }

    const onHandleAdd = async (product: IProduct) => {
        try {
            const { data } = await axios.post(`http://localhost:8000/api/v1/products`, product);
            // console.log(data);
            setProducts([...products, data]);
            alert('Thêm sản phẩm thành công');


        } catch (error) {
            console.log(error);
        }
    }

    const onHandleEdit = async (product: IProduct) => {
        try {
            const { data } = await axios.put(`http://localhost:8000/api/v1/products/${product._id}`, product);
            setProducts(products.map((item) => (item._id === data._id ? data : item)));
            alert('Cập nhập thành công !');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutWebsite />}>
                    <Route index element={<HomePage />} />
                    <Route path="shop" element={<ShopPage />} />
                    <Route path="products/:id" element={<DetailProduct />} />
                    <Route path="categories/:id" element={<CategoryDetail />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="signin" element={<Signin />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="order" element={<OrderPage />} />
                </Route>
                <Route
                    path="admin"
                    element={
                        <PrivateRoute>
                            <LayoutAdmin />
                        </PrivateRoute>
                    }
                >
                    <Route path="products" element={<ProductsList products={products} onRemove={onHandleRemove} />} />
                    <Route path="products/add" element={<ProductAdd onAdd={onHandleAdd} />} />
                    <Route path="products/:id/edit" element={<ProductEdit onEdit={onHandleEdit} />} />
                    <Route path="categories" element={< CategoryList />} />
                    <Route path="categories/add" element={< CategoryAdd />} />
                    <Route path="categories/:id/edit" element={< CategoryEdit />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default Router;