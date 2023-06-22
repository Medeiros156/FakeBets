import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Dashboard({ auth }) {
    const [totalBets, setTotalBets] = useState(null);
    console.log(totalBets)

    useEffect(() => {
        const fetchTotalBetsData = async () => {
            try {
                const response = await axios.get('/totalBets');
                console.log(response.data)
                setTotalBets(response.data.bets);
            } catch (error) {
                console.error('Error fetching wallet data:', error);
            }
        };

        fetchTotalBetsData();
    }, []);




    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="relative bg-transparent rounded-lg text-center py-16">
                        <div className="absolute inset-0 bg-[rgba(19,17,17,0.1)] rounded-[20px] backdrop-filter backdrop-blur-sm"></div>
                        <div className="relative z-10 text-8xl p-6 text-gray-200">Olá {auth.user.name}!</div>
                        <div className="relative z-10 text-2xl p-6 text-gray-200">Voce já gastou R$ {totalBets},00 em apostas no Fake Bet</div>
                    </div>
                    {/* <div onClick={() => { handleClick }} className="mx-auto max-w-sm mt-8 text-center border border-white text-2xl p-6 text-white font-bold">Quero recarregar!</div> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
