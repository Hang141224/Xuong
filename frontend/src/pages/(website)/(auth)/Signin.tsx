import { useLocalStorage } from '@/common/hooks/userStorage';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import Joi from 'joi'
import { joiResolver } from "@hookform/resolvers/joi";
import { useNavigate } from 'react-router-dom';


const signinSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).min(3).required(),
    password: Joi.string().min(6).required()
    ,
})

const Signin = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(signinSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const { mutate } = useMutation({
        mutationFn: async (formData: { email: String; password: String }) => {
            const { data } = await axios.post(`http://localhost:8000/api/v1/auth/signin`, formData);
            return data;
        },
        onSuccess: (data) => {
            localStorage.setItem('user', JSON.stringify(data));
            alert("Dang nhap thanh cong");
            navigate(`/`);
        },

        onError: (error) => console.log(error),

    });

    const onSubmit = (formData: { email: String; password: String }) => {
        mutate(formData);
    };


    return (
        <div className='container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("email", { required: true, minLength: 3 })} placeholder='Email' />
                {errors.email && <p>{errors.email.message}</p>}
                <input type="password"{...register("password", { required: true, minLength: 6 })} placeholder='Password' />
                {errors.password && <p>{errors.password.message}</p>}
                <button>Dang nhap</button>
            </form>
        </div>
    )
}

export default Signin