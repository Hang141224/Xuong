import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import axios from 'axios'
import { debounce, reduce } from 'lodash'
import { ChangeEvent } from 'react'
import { useLocalStorage } from './userStorage'

const useCart = () => {
    const queryClient = useQueryClient()
    const [user] = useLocalStorage('user', {})
    const userId = user?.user?._id

    const { data, ...restQuery } = useQuery({
        queryKey: ['cart', userId],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8000/api/v1/cart/${userId}`)
            return data
        }
    })

    const updateQuanlityDebounce = debounce(async (productId, quanlity: number) => {
        await axios.post(`http://localhost:8000/api/v1/cart/update-cart`, {
            userId,
            productId,
            quanlity
        })
        queryClient.invalidateQueries({
            queryKey: ['cart', userId]
        })
    }, 300)

    const { mutate } = useMutation({
        mutationFn: async ({ action, productId }: { action: string; productId: string }) => {
            switch (action) {
                case 'INCREMENT':
                    await axios.post(`http://localhost:8000/api/v1/cart/increase`, {
                        userId,
                        productId
                    })
                    break
                case 'DECREMENT':
                    await axios.post(`http://localhost:8000/api/v1/cart/decrease`, {
                        userId,
                        productId
                    })
                    break
                case 'REMOVE':
                    await axios.post(`http://localhost:8000/api/v1/cart/remove-form-cart`, {
                        userId,
                        productId
                    })
                    break
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cart', userId]
            })
        }
    })

    const handleQuanlityChange = (productId: string, e: ChangeEvent<HTMLInputElement>) => {
        const quanlity = parseInt(e.target.value)
        updateQuanlityDebounce(productId, quanlity)
    }
    const calculateTotal = () => {
        if (!data || !data.products) return 0
        return reduce(data.products, (total, product) => total + product.price * product.quanlity, 0)
    }

    return {
        data,
        mutate,
        calculateTotal,
        handleQuanlityChange,
        ...restQuery
    }
}

export default useCart