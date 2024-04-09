export interface IProduct {
    _id?: number | string
    name: string
    category?: string
    price: number
    quanlity: number,

    description: string
    discount: number
    featured: boolean
    countInStock: number
}