export interface IProduct {
    _id?: number | string,
    image: string,
    name: string,
    category?: string,
    price: number,
    gallery?: string[],
    quanlity: number,
    description: string,
    discount: number,
    featured: boolean,
    countInStock: number
}