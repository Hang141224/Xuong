import { useLocalStorage } from '@/common/hooks/userStorage';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import Joi from 'joi'
import { joiResolver } from "@hookform/resolvers/joi";
import { useNavigate } from 'react-router-dom';


const signupSchema = Joi.object({
    name: Joi.string().min(6),
    email: Joi.string().email({ tlds: { allow: false } }).min(3).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
})

const Signup = () => {
    const navigate = useNavigate();
    const [setUser] = useLocalStorage("user", {})
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    });

    const { mutate } = useMutation({
        mutationFn: async (formData: { name: String, email: String; password: String, confirmPassword: String }) => {
            const { data } = await axios.post(`http://localhost:8000/api/v1/auth/signup`, formData);
            alert("Dang nhap thanh cong");
            navigate(`/signin`);
            return data;
        },
        onSuccess: (data) => setUser(data),

        onError: (error) => console.log(error),

    });

    const onSubmit = (formData: { name: String, email: String; password: String, confirmPassword: String }) => {
        mutate(formData);
    };


    return (
        <div className='container'>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-white px-8 pt-6 pb-8 mb-4'>
                <h1 className=' text-2xl font-semibold mb-4 text-center'>Đăng ký</h1>

                <div className='mb-3'>
                    <label htmlFor="name" className='form-label'>
                        Tên người dùng
                    </label>
                    <input
                        type="name"
                        className='form-control'
                        placeholder='Tên người dùng'
                        {...register("name", { required: true })}
                    />
                    {errors?.name?.message && (
                        <span className='text-danger'>{errors?.name?.message}</span>
                    )}
                </div>
                <div className='mb-3'>
                    <label htmlFor="email" className='form-label'>
                        Email
                    </label>
                    <input
                        type="email"
                        className='form-control'
                        placeholder='Email'
                        {...register("email", { required: true })}
                    />
                    {errors?.email?.message && (
                        <span className='text-danger'>{errors?.email?.message}</span>
                    )}
                </div>

                <div className='mb-3'>
                    <label htmlFor="password" className='form-label'>
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        className='form-control'
                        placeholder='Mật khẩu'
                        {...register("password", { required: true })}
                    />
                    {errors?.password?.message && (
                        <span className='text-danger'>{errors?.password?.message}</span>
                    )}
                </div>


                <div className='mb-3'>
                    <label htmlFor="password" className='form-label'>
                        Lặp lại mật khẩu
                    </label>
                    <input
                        type="password"
                        className='form-control'
                        placeholder='Lặp lại mật khẩu'
                        {...register("confirmPassword", { required: true })}
                    />
                    {errors?.confirmPassword?.message && (
                        <span className='text-danger'>{errors?.confirmPassword?.message}</span>
                    )}
                </div>


                <div className='mt-3'>
                    <button
                        type='submit'
                        className='btn btn-primary'
                    >
                        Đăng ký
                    </button>
                </div>
            </form>
        </div>

    )
}

export default Signup

