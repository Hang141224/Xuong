import React from 'react';
import { useProductQuery } from '@/common/hooks/useProductQuery';
import Banner from './_component/Banner';
import ProductList from '../product/_components/ProductList';
import Shop from './_component/Shop';
import Blog from './_component/Blog';
import Services from './_component/Services';
import { IProduct } from '@/common/types/products';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const HomePage = () => {
    const { data } = useQuery({
        queryKey: ['GET_4_PRODUCTS'],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8000/api/v1/get4products`);
            return data;
        }
    })

    // Check if data is available before filtering
    const featuredProducts = data?.data ? data.data.filter((product: IProduct) => product.featured === true) : [];

    return (
        <>
            <Banner />
            <ProductList products={data} />
            <div className='container'>
                <hr />
            </div>
            <Shop />
            <Blog />
            <Services />
        </>
    );
};

export default HomePage;
