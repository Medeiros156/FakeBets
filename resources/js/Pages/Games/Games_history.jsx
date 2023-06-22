import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import teamsMap from '@/utils/teamMap';
import { Head } from '@inertiajs/react';

export default function History({ auth, games, wallet }) {
    console.log(games)

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-200 leading-tight">Games History</h2>}
            wallet={wallet}
        >
            <Head title="Bets History" />

            <div className="py-4">
                <div className="max-w-7xl mx-3 sm:mx-auto sm:px-6 lg:px-8">
                    <div className="bg-transparent overflow-hidden shadow-sm rounded-lg text-white text-xs sm:text-lg">

                        <table className="min-w-full divide-y divide-slate-200 table-auto">
                            <thead>
                                <tr>
                                    <th className="py-3">Date</th>
                                    <th className="py-3">Team A</th>
                                    <th className="py-3">Score</th>
                                    <th className="py-3">Team B</th>
                                </tr>
                            </thead>
                            <tbody>


                                {
                                    games.map((game, index) => (
                                        <tr key={index} className='divide-x divide-slate-200'>
                                            <td className='py-3 text-center w-10 sm:w-1/6'>
                                                {new Date(game.startDateTime).toLocaleString(undefined, {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    hour12: false
                                                })}
                                            </td>
                                            <td className='py-3 w-20 sm:w-auto'>
                                                <div className="flex flex-col items-center justify-center ">

                                                    <img src={`${teamsMap[game.teamA]}`} alt={game.teamA} className="h-6 w-6 sm:h-8 sm:w-8 " />
                                                    <p className='text-center'>

                                                        {game.teamA}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="py-3 text-center">{game.scoreA ?? ''}  - {game.scoreB ?? ''}</td>
                                            <td className='py-3 w-20 sm:w-auto'>
                                                <div className="text-center flex flex-col items-center justify-center ">

                                                    <img src={`${teamsMap[game.teamB]}`} alt={game.teamB} className="h-6 w-6 sm:h-8 sm:w-8" />
                                                    {game.teamB}
                                                </div>
                                            </td>



                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
