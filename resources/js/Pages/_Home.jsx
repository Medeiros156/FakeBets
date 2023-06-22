import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function Home({ top_betters }) {
    console.log(top_betters)
    return (
        <>
            <Head title="Home" />

            <div className="bg-gray-900 text-gray-200 font-poppins">
                <section className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-[url('/imagens/bg-home2.jpg')] bg-fixed">
                    <div className="max-w-[512px] w-[90%] mx-auto flex justify-center flex-col-reverse md:flex-row">
                        <div className="pb-40 text-center justify-center items-center flex flex-col gap-8">
                            <img className="max-w-xs" src="/imagens/BrasileiroSérieA.png" alt="" />
                            <h1 className="text-2xl md:text-8xl font-bold text-primary leading-tight uppercase">Fake Bets</h1>
                            <p className="text-lg text-slate-200 font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore esse unde
                                sunt possimus minus aut
                                voluptas asperiores </p>
                            <Link href="/login" className="btn-primary border border-white p-5 text-lg">Start "Betting"</Link>
                        </div>
                        {/* <div className="flex-1 ">
                            <div className="w-full h-[50vh] md:h-screen overflow-hidden relative">
                                <img className="w-full h-full md:h-[150vh] object-contain md:absolute md:top-[-25%]"
                                    src="/imagens/hero_section_img.jpg" alt="" />
                            </div>
                        </div> */}
                    </div>
                </section>

                <section className="flex items-center justify-center  py-[100px] ">
                    <div className="max-w-[800px] w-[90%] mx-auto">
                        <div className="flex justify-between md:flex-row flex-col md:gap-5 gap-10">
                            <div className="text-center">
                                <h1 className="text-[80px] font-bold text-primary leading-tight uppercase">500+</h1>
                                <p className="text-xl">Users</p>
                            </div>
                            <div className="text-center">
                                <h1 className="text-[80px] font-bold text-primary leading-tight uppercase">1000+</h1>
                                <p className="text-xl">Real Soccer Games</p>
                            </div>
                            <div className="text-center">
                                <h1 className="text-[80px] font-bold text-primary leading-tight uppercase">8000+</h1>
                                <p className="text-xl">Bets</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="flex items-center justify-center  py-[100px]">
                    <div className="max-w-[800px] w-[90%] mx-auto">
                        <h1 className="text-4xl md:text-[80px] font-bold leading-tight uppercase">Don't lose money</h1>
                        <a href="#" className="btn-primary">Fake Bet Now</a>
                    </div>
                </section>
                <section className="flex items-center justify-center  py-[100px] bg-cover bg-center bg-no-repeat bg-[url('/imagens/bg-hero.jpg')]  bg-fixed ">
                    <div className="max-w-[1024px] w-[90%] mx-auto">
                        <h1 className="text-white text-6xl font-bold text-center">
                            Higher Rollers</h1>

                        <div className="mt-10 max-w-[100%] overflow-x-auto rounded-lg">
                            <table className="w-fit bg-transparentrounded-lg sm:min-w-[600px] min-w-[300px] text-center mx-auto overflow-hidden table-auto">
                                <thead>
                                    <tr className="">
                                        <th className="p-5">#</th>
                                        <th className="p-5">Apostador</th>
                                        <th className="p-5">Amount</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {top_betters.map((bet, index) => (
                                        <tr key={index} className="border-b border-gray-500">
                                            <td className="p-5 sm:p-5">{index + 1}</td>
                                            <td className="p-5 sm:p-5">{bet.f0}</td>
                                            <td className="p-5 sm:p-5 whitespace-nowrap">R$ {bet.f1}.00</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>






                <footer className="bg-gray-900 text-white">
                    <div className="container mx-auto py-8 px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Company Name</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit dolor vitae elit varius efficitur.</p>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Contact</h2>
                                <p>123 Main Street, City, Country</p>
                                <p>Email: info@example.com</p>
                                <p>Phone: +1234567890</p>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Links</h2>
                                <ul className="list-none">
                                    <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Social Media</h2>
                                <ul className="flex space-x-4">
                                    <li><a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>


            </div>
        </>
    );
}
