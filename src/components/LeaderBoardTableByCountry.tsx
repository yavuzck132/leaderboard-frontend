'use client';

import React, { useEffect, useState } from 'react';
import TableHeader from './TableHeader';
import TableComponent from './TableComponent';
import { getRankedPlayersByCountry } from '@/services/apiServices';
import { Player } from '@/models/Types';
import CountryDisplay from './CountryDisplay';


const LeaderBoardTableByCountry: React.FC = () => {
    const [data, setData] = useState<Player[][]>([])
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        getRankedPlayersByCountry()
            .then((data) => {
                setData(data)
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, [])

    if (loading) return (<p className='text-white py-2 mx-8'>Loading...</p>)
    return (
        <>
            <TableHeader
                propHeaders={[{ header: "Rank", headerKey: "rank" }, { header: "Name", headerKey: "name" }, { header: "Money", headerKey: "money" }]} />
            {data.map((playerData, index) => (
                <div key={index}>
                    <div className='flex justify-center text-white bg-[#2d2159] py-2 mx-6 relative'>
                        <div className="absolute top-0 left-0 w-0 h-0 border-r-[50px] border-t-[20px] border-r-transparent border-t-slate-900"></div>
                        <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[50px] border-b-[20px] border-l-transparent border-b-slate-900"></div>
                        <CountryDisplay countryCode={playerData[0].country} />
                    </div>
                    <div className='mx-2'>
                        <TableComponent players={playerData} />
                    </div>
                </div>
            ))}
        </>
    );
};

export default LeaderBoardTableByCountry;