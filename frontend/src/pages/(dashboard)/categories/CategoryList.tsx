import React from 'react';
import { ICategory } from '@/interfaces/categories';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery<ICategory[]>({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:8000/api/v1/categories');
            return response.data;
        }
    });

    const { mutate } = useMutation({
        mutationFn: async (id: number) => {
            return (window.confirm("Ban co chac chan muon xoa khong") &&
                (await axios.delete(`http://localhost:8000/api/v1/categories/${id}`))
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories']
            });
        },
        onError: (error) => {
            console.error('Error deleting category:', error);
            alert("Xoa that bai")
        }
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching categories</div>;
    }

    return (
        <div className='container'>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Quản lý danh mục</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                        <Link to="/admin/categories/add" className="btn btn-sm btn-primary">
                            Thêm danh mục
                        </Link>
                    </div>
                </div>
            </div>
            <div className="table-responsive small">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên danh mục</th>
                            <th scope="col">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item: ICategory, index: number): JSX.Element => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>
                                    <Link to={`/admin/categories/${item.id}/edit`} className='btn btn-primary'>Edit</Link>
                                    <button onClick={() => mutate(item.id!)} className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryList;
