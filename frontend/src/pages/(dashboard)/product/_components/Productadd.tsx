import { IProduct } from '@/interfaces/product';
import React from 'react'

import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type ProductAddProps = {
    onAdd: (product: IProduct) => void;
};
type Inputs = {
    name: string;
    price: number;
    image: string;
    description: string;
}
const ProductAdd = ({ onAdd }: ProductAddProps) => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        onAdd(data);
        navigate("/admin/products");
    };


    return (
        <div className='container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Thêm sản phẩm</h1>
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
                    <label htmlFor="description" className="form-label">Mô tả sản phẩm</label>
                    <textarea cols={30} rows={10} {...register('description')} id="productPrice" className="form-control" />
                </div>

                <button type="submit" className="btn btn-primary">Thêm</button>
            </form>
        </div>
    )
}

export default ProductAdd