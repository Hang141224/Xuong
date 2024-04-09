import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { IProduct } from '@/interfaces/product';

type ProductEditProps = {
    onEdit: (product: IProduct) => void;
};
type Inputs = {
    name: string;
    price: number;
    image: string;
}
const ProductEdit = ({ onEdit }: ProductEditProps) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Inputs>();

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`http://localhost:8000/api/products/${id}`);
            reset(data);
        })();
    }, []);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        onEdit(data);
        navigate("/admin/products");
    };


    return (
        <div className='container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Cập nhập sản phẩm</h1>
                </div>

                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Tên sản phẩm</label>
                    <input type="text" {...register('name')} id="productName" className="form-control" />
                </div>

                <div className="mb-3">
                    <label htmlFor="productImage" className="form-label">Ảnh sản phẩm</label>
                    <input type="text" {...register('image')} id="productImage" className="form-control" />
                </div>

                <div className="mb-3">
                    <label htmlFor="productPrice" className="form-label">Giá sản phẩm</label>
                    <input type="number" {...register('price')} id="productPrice" className="form-control" />
                </div>

                <button type="submit" className="btn btn-primary">Cập nhập sản phẩm</button>
            </form>
        </div>
    )
}

export default ProductEdit