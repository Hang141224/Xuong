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
    discount: number,
    image: string;
    category: string,
    description: string,
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
                    <input type="text" {...register('name', { required: true })} id="productName" className="form-control" />
                    {errors.name && errors.name.type === "required" && (
                        <div className='form-text text-danger'>Vui lòng nhập thông tin</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="productImage" className="form-label">Ảnh sản phẩm</label>
                    <input type="text" {...register('image', { required: true })} id="productImage" className="form-control" />
                    {errors.image && errors.image.type === "required" && (
                        <div className='form-text text-danger'>Vui lòng nhập thông tin</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="productPrice" className="form-label">Giá sản phẩm</label>
                    <input type="number" {...register('price', { required: true, validate: (value) => !isNaN(value) })} id="productPrice" className="form-control" />
                    {errors.price && errors.price.type === "required" && (
                        <div className='form-text text-danger'>Vui lòng nhập thông tin</div>
                    )}
                    {errors.price && errors.price.type === "validate" && (
                        <div className='form-text text-danger'>Vui lòng nhập số</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="discount" className="form-label">Giảm giá</label>
                    <input type="number" {...register('discount', { required: true, validate: (value) => !isNaN(value) })} id="discount" className="form-control" />
                    {errors.discount && errors.discount.type === "required" && (
                        <div className='form-text text-danger'>Vui lòng nhập thông tin</div>
                    )}
                    {errors.discount && errors.discount.type === "validate" && (
                        <div className='form-text text-danger'>Vui lòng nhập số</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Danh mục</label>
                    <input type="text" {...register('category')} id="category" className="form-control" />
                    {errors.category && errors.category.type === "required" && (
                        <div className='form-text text-danger'>Vui lòng nhập thông tin</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Mô tả sản phẩm</label>
                    <textarea className="form-control" {...register('description', { required: true })} id="description" cols={30} rows={10} />
                    {errors.description && errors.description.type === "required" && (
                        <div className='form-text text-danger'>Vui lòng nhập thông tin</div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary">Thêm</button>
            </form>
        </div>
    )
}

export default ProductAdd