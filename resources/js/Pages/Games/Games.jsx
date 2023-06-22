import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import teamsMap from '../../utils/teamMap.js';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from '@inertiajs/react';

export default function Games({ auth, games }) {
    console.log(games)
    const toastConfig = {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: 'dark',
    };
    useEffect(() => {
        const betCreated = localStorage.getItem('betCreated');

        if (betCreated) {
            toast('Bet Created successfully', toastConfig); // Display the toast
            localStorage.removeItem('betCreated'); // Remove the flag from localStorage
        }
    }, []);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-200 leading-tight">Games</h2>}
        >
            <Head title="Games" />

            <div className="py-4">
                <div className="max-w-7xl mx-3 sm:mx-auto sm:px-6 lg:px-8">
                    <div className="bg-transparent overflow-hidden shadow-sm rounded-lg text-white text-xs sm:text-lg">

                        <table className="min-w-full divide-y divide-slate-200 table-auto ">
                            <thead>
                                <tr>
                                    <th className="py-3">Date</th>
                                    <th className="py-3">Team A</th>
                                    {/* <th className="py-3">Score</th> */}
                                    <th className="py-3">Odds</th>
                                    <th className="py-3">Team B</th>
                                </tr>
                            </thead>
                            <tbody>


                                {
                                    games.map((game, index) => (
                                        <tr key={index} className='divide-x divide-slate-200'>
                                            <td className='py-2 text-center w-10 sm:w-1/6'>
                                                {new Date(game.startDateTime).toLocaleString(undefined, {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    hour12: false
                                                })}
                                            </td>
                                            <td className='py-2 w-20 sm:w-auto'>
                                                <div className="flex flex-col items-center justify-center ">

                                                    <img src={`${teamsMap[game.teamA]}`} alt={game.teamA} className="h-6 w-6 sm:h-8 sm:w-8 " />
                                                    <p className='text-center'>

                                                        {game.teamA}
                                                    </p>
                                                </div>
                                            </td>
                                            {/* <td className="text-center">{game.scoreA ?? ''}  - {game.scoreB ?? ''}</td> */}
                                            <td className="py-2 ">
                                                <div className="flex justify-evenly items-center my-5 text-black font-extrabold">
                                                    <Link href={route('bet', { oddsSelected: 'oddsA', oddsSelectedValue: game.oddsA, oddsA: game.oddsA, oddsDraw: game.oddsDraw, oddsB: game.oddsB, teamA: game.teamA, teamB: game.teamB, gameId: game.gameId })}>
                                                        <div className="flex flex-col items-center relative">
                                                            <span className="absolute text-white bottom-6 sm:bottom-11 text-center text-xs">A</span>
                                                            <span className="text-[10px] sm:text-lg flex items-center justify-center mx-auto bg-gray-400 border border-slate-500 text-center w-6 h-6 sm:w-10 sm:h-10" data-identifier="oddsA">{game.oddsA}</span>
                                                        </div>
                                                    </Link>
                                                    <Link href={route('bet', { oddsSelected: 'oddsDraw', oddsSelectedValue: game.oddsDraw, oddsA: game.oddsA, oddsDraw: game.oddsDraw, oddsB: game.oddsB, teamA: game.teamA, teamB: game.teamB, gameId: game.gameId })}>
                                                        <div className="flex flex-col items-center relative">
                                                            <span className="absolute text-white bottom-6 sm:bottom-11 text-center text-xs">Draw</span>
                                                            <span className="text-[10px] sm:text-lg flex items-center justify-center mx-auto bg-gray-400 border border-slate-500 text-center w-6 h-6 sm:w-10 sm:h-10" data-identifier="oddsDraw">{game.oddsDraw}</span>
                                                        </div>
                                                    </Link>
                                                    <Link href={route('bet', { oddsSelected: 'oddsB', oddsSelectedValue: game.oddsB, oddsA: game.oddsA, oddsDraw: game.oddsDraw, oddsB: game.oddsB, teamA: game.teamA, teamB: game.teamB, gameId: game.gameId })}>
                                                        <div className="flex flex-col items-center relative">
                                                            <span className="absolute text-white bottom-6 sm:bottom-11 text-center text-xs">B</span>
                                                            <span className="text-[10px] sm:text-lg flex items-center justify-center mx-auto bg-gray-400 border border-slate-500 text-center w-6 h-6 sm:w-10 sm:h-10" data-identifier="oddsB">{game.oddsB}</span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </td>
                                            <td className='py-2 w-20 sm:w-auto'>
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
                <ToastContainer />
            </div>
        </AuthenticatedLayout>
    );
}
