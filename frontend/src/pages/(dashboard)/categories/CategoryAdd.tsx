import React from 'react'
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ICategory } from '@/interfaces/categories';

const categorySchema = Joi.object({
    name: Joi.string().required().min(3),
});

const CategoryAdd = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(categorySchema),
        defaultValues: {
            name: "",
        },
    });

    const { mutate } = useMutation({
        mutationFn: async (category: ICategory) => {
            const { data } = await axios.post(`http://localhost:8000/api/v1/categories`, category);
            return data.product;
        },
        onSuccess: () => {
            alert('Them danh muc thanh cong');
            queryClient.invalidateQueries({
                queryKey: ['CATEGORY'],
            });
        },
    });

    const onSubmit = (category: ICategory) => {
        mutate(category);
        navigate(`/admin/categories`);
    }

    return (
        <div className='container'>
            <h2 className='mt-5'>Them danh muc</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-3'>
                    <label htmlFor="name" className='form-label'>
                        Ten danh muc
                    </label>
                    <input
                        type="text"
                        className='form-control'
                        placeholder='Ten danh muc'
                        {...register('name', { required: true, minLength: 3 })}
                    />
                    {errors?.name?.message && (
                        <span className='text-danger'>{errors?.name?.message}</span>
                    )}
                </div>


                <button className='btn btn-primary'>Them danh muc moi</button>
            </form>
        </div>
    )
}

export default CategoryAdd