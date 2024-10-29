// app/components/LeaderboardTable.tsx

'use client';

import React, { useContext, useEffect, useState } from 'react';
import TableHeader from './TableHeader';
import TableComponent from './TableComponent';
import { Player } from '@/models/Types';
import { getRankedPlayers } from '@/services/apiServices';


const LeaderBoardTable: React.FC = () => {
  const [data, setData] = useState<Player[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getRankedPlayers()
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
        propHeaders={[{ header: "Rank", headerKey: "rank" }, { header: "Name", headerKey: "name" }, { header: "Country", headerKey: "country" }, { header: "Money", headerKey: "money" }]} />
      <TableComponent players={data} />
    </>
  );
};

export default LeaderBoardTable;