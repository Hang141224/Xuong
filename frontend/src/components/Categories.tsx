// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Categories = () => {
//     const { data: categories } = useQuery({
//         queryKey: ['CATEGORY_LIST'],
//         queryFn: async () => {
//             const response = await axios.get('http://localhost:8000/api/v1/categories');
//             return response.data;
//         }
//     });
//     console.log(categories);

//     return (
//         <div>
//             <section className="news">
//                 <div className="container">
//                     <div className="section-heading">
//                         <h2 className="section-heading__title">Categories</h2>
//                     </div>
//                     <div>
//                         {categories?.map((category: { _id?: number; name: string }) => (
//                             <div key={category._id}>
//                                 <h3>
//                                     <Link to={`categories/${category._id}`}>{category.name}</Link>
//                                 </h3>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default Categories;
