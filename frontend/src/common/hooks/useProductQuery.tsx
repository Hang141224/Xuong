import { getAllProducts, getProductById } from "@/services/products"
import { useQuery } from "@tanstack/react-query"

export const useProductQuery = (id?: number | string) => {
    const { data, ...reset } = useQuery({
        queryKey: ["PRODUCT_KEY", id],
        queryFn: async () => {
            return id ? await getProductById(id as number | string) : await getAllProducts()
        },
    });
    return { data, ...reset };
}