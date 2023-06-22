import React from 'react';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,

} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Wallet() {
    return (
        <QueryClientProvider client={queryClient}>
            <Fetch />
        </QueryClientProvider>
    )
}
function Fetch() {
    const { isLoading, error, data } = useQuery({
        queryKey: ['wallet'],
        queryFn: () =>
            fetch('/wallet').then(
                (res) => res.json(),
            ),
    })

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message
    return (
        <div className='text-white flex gap-2 justify-center items-center'>
            <span className='border border-white p-1'>R$ {data.user.wallet},00</span>
        </div>
    )
}


