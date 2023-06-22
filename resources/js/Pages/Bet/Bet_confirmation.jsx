import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import teamsMap from '@/utils/teamMap';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from '@inertiajs/react';



export default function Bet_confirmation({ auth, oddsValue, oddTeam, teamA, teamB, value, gameId }) {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    console.log(auth)
    console.log(teamA)
    console.log(oddsValue)
    // console.log(odd)

    const handleSubmit = async () => {
        if (isButtonDisabled) {
            return;
        }

        setIsButtonDisabled(true);

        // const selectedTeam = oddTeam === 'teamA' ? teamA : teamB
        const selectedTeam = oddTeam === 'oddsA' ? teamA : oddTeam === 'oddsB' ? teamB : 'DRAW';

        console.log(selectedTeam)
        try {
            const data = {
                teamBet: selectedTeam,
                amountBet: parseInt(value),
                gameId: parseInt(gameId),
                userEmail: auth.user.email,
                oddsValue: parseFloat(oddsValue)
            };
            console.log(data)
            await axios.post('/betpost', data);

            // Handle success response
            console.log('Bet created successfully!');
            localStorage.setItem('betCreated', 'true');


            // window.location.href = '/games';

        } catch (error) {
            // Handle error response
            console.error('Error creating the bet:', error);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Bet Confirmation</h2>}
        >
            <Head title="Bet" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="border border-white relative flex justify-between flex-col px-10 py-10 rounded-[20px] m-4">
                        <div className="absolute inset-0 bg-[rgba(19,17,17,0.1)] rounded-[20px] backdrop-filter backdrop-blur-sm"></div>
                        <div className="flex justify-around relative">
                            <div className="flex items-center align-ce flex-col justify-center gap-2">
                                <h3 className="text-center text-white text-xl sm:text-2xl">{teamA}</h3>
                                <img src={`${teamsMap[teamA]}`} alt="teamA" className="h-6 w-6 sm:h-20 sm:w-20" />
                            </div>
                            <span className="absolute text-4xl text-white top-1/2">X</span>
                            <div className="flex items-center flex-col justify-center gap-2">
                                <h3 className="text-center text-white text-xl sm:text-2xl">{teamB}</h3>
                                <img src={`${teamsMap[teamB]}`} alt="teamB" className="h-6 w-6 sm:h-20 sm:w-20" />
                            </div>
                        </div>
                        <div className="flex justify-evenly items-center my-14">
                            <div
                                className={`flex flex-col items-center relative`}
                            >
                                <span className={`absolute text-red-800 bottom-6 sm:bottom-11 text-center text-xs ${oddTeam === 'oddsA' ? 'sm:bottom-18 mb-4 scale-150' : ''}`}>A</span>
                                <span className={`text-[10px] sm:text-lg flex items-center justify-center mx-auto bg-gray-300 border-4 text-center w-6 h-6 sm:w-11 sm:h-11
                                ${oddTeam === 'oddsA' ? 'border-green-500 scale-150' : 'border-gray-500'
                                    }`} data-identifier="oddsA">
                                    {oddTeam === 'oddsA' ? oddsValue : ''}
                                </span>
                            </div>
                            <div
                                className={`flex flex-col items-center relative `}
                            // onClick={() => handleOddsSelection({ oddsDraw })}
                            >
                                <span className={`absolute text-red-800 bottom-6 sm:bottom-11 text-center text-xs ${oddTeam === 'oddsDraw' ? 'sm:bottom-18  mb-4  scale-150' : ''}`}>Draw</span>
                                <span className={`text-[10px] sm:text-lg flex items-center justify-center mx-auto bg-gray-300 border-4 text-center w-6 h-6 sm:w-11 sm:h-11
                            ${oddTeam === 'oddsDraw' ? 'border-green-500 scale-150' : 'border-gray-500'
                                    }`} data-identifier="oddsDraw">
                                    {oddTeam === 'oddsDraw' ? oddsValue : ''}
                                </span>
                            </div>
                            <div
                                className={`flex flex-col items-center relative `}
                            // onClick={() => handleOddsSelection({ oddsB })}
                            >
                                <span className={`absolute text-red-800 bottom-6 sm:bottom-11 text-center text-xs ${oddTeam === 'oddsB' ? 'sm:bottom-18  mb-4  scale-150' : ''}`}>B</span>
                                <span className={`text-[10px] sm:text-lg flex items-center justify-center mx-auto bg-gray-300 border-4 text-center w-6 h-6 sm:w-11 sm:h-11
                        ${oddTeam === 'oddsB' ? 'border-green-500 scale-150' : 'border-gray-500'
                                    }`} data-identifier="oddsB">
                                    {oddTeam === 'oddsB' ? oddsValue : ''}
                                </span>
                            </div>
                        </div>


                        <div className="flex flex-col items-center z-10">
                            <h3 className="text-4xl mb-2">R$ {value},00</h3>
                            <Link href='/games' onClick={handleSubmit} disabled={isButtonDisabled} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Submit Bet
                            </Link>
                        </div>
                    </div>
                </div >

            </div >
        </AuthenticatedLayout >
    );
}
