import { useLeaderboardContext } from "@/context/LeaderboardContext";
import { Player } from "@/models/Types";
import CountryDisplay from "./CountryDisplay";

const TableComponent: React.FC<{ players: Player[], selectedPlayerIndex?: number }> = ({ players, selectedPlayerIndex }) => {
  const { headers } = useLeaderboardContext();

  //Fill data cell with correct data format
  const tableData = (headerKey: string, player: Player): JSX.Element => {
    if (headerKey === "country") {
      return <CountryDisplay countryCode={player.country} />
    } else if (headerKey === "money") {
      return <div>{Math.round((player[headerKey as keyof Player] as number))}</div>
    } else {
      return <div>{player[headerKey as keyof Player]}</div>
    }
  }

  return (
    <div className="mx-7">
      {players.map((row: Player, rowIndex: number) => (
        <div key={rowIndex} className={`${rowIndex === selectedPlayerIndex ? "bg-[#2c2250]" : "bg-[#251e40]"} flex border-gray-200 my-5 relative`}>
          <div className="absolute top-0 left-0 w-0 h-0 border-r-[50px] border-t-[20px] border-r-transparent border-t-slate-900"></div>
          <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[50px] border-b-[20px] border-l-transparent border-b-slate-900"></div>
          {headers.map((header: { header: string, headerKey: string }, index: number) => (
            <div key={header.headerKey} className={`flex-1 flex items-center text-white py-2 text-gray-800 ${index === 0 ? "pl-6 sm:pl-12" : "px-4"} ${index === 1 && "pl-7"}`}>
              {tableData(header.headerKey, row)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableComponent;