import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Bet_history({ auth, bets }) {
    console.log(bets)

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-200 leading-tight">Bets History</h2>}
        >
            <Head title="Bets History" />

            <div className="py-4">
                <div className="max-w-7xl mx-3 sm:mx-auto sm:px-6 lg:px-8">
                    <div className="bg-transparent overflow-hidden shadow-sm rounded-lg text-white text-xs sm:text-lg">

                        <table className="min-w-full divide-y divide-gray-200 table-auto">
                            <thead>
                                <tr>
                                    <th className="py-3">Team Bet</th>
                                    <th className="py-3">Amount Bet</th>
                                    <th className="py-3">Odds Value</th>
                                    {/* <th className="py-3">Game ID</th> */}
                                    {/* <th className="py-3">User EMAIL</th> */}
                                    <th className="py-3">Bet Status</th>
                                    <th className="py-3">Bet Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bets.map((bet, index) => (
                                    <tr key={index} className={`divide-x divide-gray-200 text-center ${bet.betResult == true ? 'text-green-400' : 'text-gray-300'}`}>
                                        <td>{bet.teamBet}</td>
                                        <td>{bet.amountBet}</td>
                                        <td>{bet.oddsValue}</td>
                                        {/* <td>{bet.gameId}</td> */}
                                        {/* <td>{bet.userEmail}</td> */}
                                        <td>{bet.betStatus ? "Ongoing" : "Terminated"}</td>
                                        <td className="text-center w-10 sm:w-1/6">
                                            {new Date(bet.betCreatedAt).toLocaleString(undefined, {
                                                day: "numeric",
                                                month: "short",
                                                hour: "numeric",
                                                minute: "numeric",
                                                hour12: false,
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
