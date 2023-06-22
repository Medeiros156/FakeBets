import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import teamsMap from '@/utils/teamMap';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/react';

export default function Bet({ auth, oddsSelected, oddsSelectedValue, oddsA, oddsDraw, oddsB, teamA, teamB, gameId }) {
    const [selectedOdds, setSelectedOdds] = useState(oddsSelectedValue);
    const [selectedOddsTeam, setSelectedOddsTeam] = useState(oddsSelected);
    const [value, setValue] = useState(0);
    console.log(oddsSelected)
    console.log(selectedOdds)

    const [wallet, setWallet] = useState(null);

    useEffect(() => {
        const fetchWalletData = async () => {
            try {
                const response = await axios.get('/wallet');
                console.log(response.data.user.wallet)
                setWallet(response.data.user.wallet);
            } catch (error) {
                console.error('Error fetching wallet data:', error);
            }
        };

        fetchWalletData();
    }, []);



    const handleOddsSelection = (odds) => {
        console.log(Object.values(odds)[0])
        console.log(Object.keys(odds)[0])

        setSelectedOdds(Object.values(odds)[0]);
        setSelectedOddsTeam(Object.keys(odds)[0]);
    };

    const handleChange = (e) => {
        const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        const newValue = inputValue === '' ? 0 : parseInt(inputValue);
        const clampedValue = newValue > wallet ? wallet : newValue;
        setValue(clampedValue);
    };
    const formatCurrency = (value) => {
        const formattedValue = value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return formattedValue.replace('R$', '');
    };
    // const formatCurrency = (value) => {
    //     const formatter = new Intl.NumberFormat('pt-BR', {
    //         style: 'currency',
    //         currency: 'BRL',
    //         minimumFractionDigits: 0,
    //     });
    //     return formatter.format(value);
    // };
    const isButtonDisabled = selectedOdds === null || selectedOddsTeam === null || value === 0;
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Bet</h2>}
        >
            <Head title="Bet" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="border border-white relative flex justify-between flex-col px-10 py-10 rounded-[20px] m-4">
                        <div className="absolute inset-0 bg-[rgba(19,17,17,0.1)] rounded-[20px] backdrop-filter backdrop-blur-sm"></div>
                        <div className=" bg-transparent flex justify-around relative z-10">
                            <div className="flex items-center flex-col justify-center gap-2">
                                <h3 className="text-center text-white text-xl sm:text-2xl">{teamA}</h3>
                                <img src={`${teamsMap[teamA]}`} alt="asdf" className="h-14 w-14 sm:h-20 sm:w-20" />
                            </div>
                            <span className="absolute text-4xl text-white top-1/2">X</span>
                            <div className="flex items-center flex-col justify-center gap-2">
                                <h3 className="text-center text-white text-xl sm:text-2xl">{teamB}</h3>
                                <img src={`${teamsMap[teamB]}`} alt="asdf" className="h-14 w-14 sm:h-20 sm:w-20" />
                            </div>
                        </div>
                        <div className="flex justify-evenly items-center my-14 z-10">
                            <button
                                className={`flex flex-col items-center relative`}
                                onClick={() => handleOddsSelection({ oddsA })}
                            >
                                <span className="absolute text-white bottom-12 sm:bottom-14 text-center text-xs">A</span>
                                <span className={`text-[16px] sm:text-lg flex items-center justify-center mx-auto bg-gray-300 border-4 text-center w-10 h-10 sm:w-12 sm:h-12  ${selectedOddsTeam === 'oddsA' ? 'border-green-500 scale-110' : 'border-gray-500'
                                    }`} data-identifier="oddsA">
                                    {oddsA}
                                </span>
                            </button>
                            <button
                                className={`flex flex-col items-center relative `}
                                onClick={() => handleOddsSelection({ oddsDraw })}
                            >
                                <span className="absolute text-white bottom-12 sm:bottom-14 text-center text-xs">Draw</span>
                                <span className={`text-[16px] sm:text-lg flex items-center justify-center mx-auto bg-gray-300 border-4 text-center w-10 h-10 sm:w-12 sm:h-12 ${selectedOddsTeam === 'oddsDraw' ? 'border-green-500 scale-110' : 'border-gray-500'
                                    }`} data-identifier="oddsDraw">
                                    {oddsDraw}
                                </span>
                            </button>
                            <button
                                className={`flex flex-col items-center relative `}
                                onClick={() => handleOddsSelection({ oddsB })}
                            >
                                <span className="absolute text-white bottom-12 sm:bottom-14 text-center text-xs">B</span>
                                <span className={`text-[16px] sm:text-lg flex items-center justify-center mx-auto bg-gray-300 border-4 text-center w-10 h-10 sm:w-12 sm:h-12 ${selectedOddsTeam === 'oddsB' ? 'border-green-500 scale-110' : 'border-gray-500'
                                    }`} data-identifier="oddsB">
                                    {oddsB}
                                </span>
                            </button>
                        </div>


                        <div className="flex flex-col items-center z-10">
                            {/* <span className="text-lg mb-2">{formatCurrency(value)}</span> */}
                            <input
                                type="range"
                                min="0"
                                max={wallet}
                                value={value}
                                onChange={handleChange}
                                className="w-[90%] sm:w-3/4 appearance-none h-2 bg-slate-500 rounded-lg "
                            />
                            <div className='w-1/6 justify-center flex items-center'>

                                <span className=''>R$</span>
                                <input
                                    type="text"
                                    inputMode='numeric'
                                    min="0"
                                    max={wallet}
                                    value={value}
                                    onChange={handleChange}
                                    className="w-16 sm:w-28 text-center bg-transparent m-4 border-slate-700"
                                />
                            </div>
                            <Link
                                href={
                                    isButtonDisabled
                                        ? null
                                        : route('bet/confirmation', {
                                            oddsValue: selectedOdds,
                                            oddTeam: selectedOddsTeam,
                                            teamA: teamA,
                                            teamB: teamB,
                                            value: value,
                                            gameId: gameId,
                                        })
                                }
                                className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                Bet
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
