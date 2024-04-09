
import { IProduct } from '@/interfaces/product';
import React from 'react';

import {
    Link
} from 'react-router-dom';

type ProductListProps = {
    products: IProduct[];
    onRemove: (id: number) => void;
};

const ProductsList = ({ products, onRemove }: ProductListProps) => {

    return (
        <div className='container'>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Quản lý sản phẩm</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                        <Link to={`/admin/products/add`} className="btn btn-sm btn-primary">
                            Thêm sản phẩm
                        </Link>
                    </div>
                </div>
            </div>
            <div className="table-responsive small">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Giá sản phẩm</th>
                            <th scope="col">Ảnh</th>
                            <th scope='col'>Mô tả</th>
                            <th scope="col">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item: IProduct, index: number): JSX.Element => {
                            return (
                                <tr key={index}>
                                    <td></td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td><img src={item.image} style={{ height: 150, width: 150 }} /></td>
                                    <td>{item.description}</td>
                                    <td>
                                        <Link to={`/admin/products/${item._id}/edit`} className='btn btn-primary'>Edit</Link>
                                        <button onClick={() => onRemove(item?._id!)} className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductsList;