"use client"
import React from 'react';
import SearchBar from '../components/SearchBar';
import Header from '@/components/Header';
import LeaderboardTable from '@/components/LeaderBoardTable';
import { useLeaderboardContext } from '@/context/LeaderboardContext';
import SearchTable from '@/components/SearchTable';
import LeaderBoardTableByCountry from '@/components/LeaderBoardTableByCountry';

export default function Home() {
  const { searchText, viewType } = useLeaderboardContext();
  return (
    <div className='text-sm'>
      <Header />
      <SearchBar />
      {viewType === "view1" ? <LeaderboardTable /> : <LeaderBoardTableByCountry />}
      {searchText !== "" ? <SearchTable /> : <></>}
    </div>
  );
}