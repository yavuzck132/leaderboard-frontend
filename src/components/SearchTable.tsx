import { Player } from "@/models/Types";
import TableComponent from "./TableComponent";
import { useEffect, useState } from "react";
import { getSelectedPlayerAndNeighbours } from "@/services/apiServices";
import { useLeaderboardContext } from "@/context/LeaderboardContext";

const SearchTable: React.FC = () => {
  const { searchText } = useLeaderboardContext();
  const [data, setData] = useState<Player[]>([]);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getSelectedPlayerAndNeighbours(searchText)
      .then((data) => {
        setData(data)
        data.forEach((playerData: Player, index: number) => {
          if (playerData.name === searchText) {
            setSelectedPlayerIndex(index);
            setLoading(false);
          }
        })
      })
      .catch((error) => console.error(error));
  }, [searchText])

  if (loading) return (<p className='text-white py-2 mx-8'>Loading...</p>)
  return (
    <>
      <div className='flex justify-center text-white bg-[#2d2159] py-2 mx-6 relative'>
        <div className="absolute top-0 left-0 w-0 h-0 border-r-[50px] border-t-[20px] border-r-transparent border-t-slate-900"></div>
        <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[50px] border-b-[20px] border-l-transparent border-b-slate-900"></div>
        <h1>Searched player</h1>
      </div>
      {data.length !== 0 ? <div className='mx-2'>
        <TableComponent players={data} selectedPlayerIndex={selectedPlayerIndex} />
      </div> : <div className="text-center text-white py-3">No player found</div>}

    </>
  );
};

export default SearchTable;