import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useLeaderboardContext } from '@/context/LeaderboardContext';


const TableHeader: React.FC<{ propHeaders: {header: string, headerKey: string}[] }> = ({ propHeaders }) => {
  const {headers, setHeaders} = useLeaderboardContext();

  useEffect(()=>{
    setHeaders(propHeaders)
  }, [])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const updatedHeaders = Array.from(headers);
    const [movedHeader] = updatedHeaders.splice(result.source.index, 1);
    updatedHeaders.splice(result.destination.index, 0, movedHeader);
    console.log(updatedHeaders);
    setHeaders(updatedHeaders);
  };

  return (
    <div className="p-7">
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable" direction="horizontal">
      {(provided) => (
        <div 
          ref={provided.innerRef} 
          {...provided.droppableProps} 
          className="flex bg-[#1c172b] border border-[#251e40] rounded-md"
        >
          {headers.map((header, index) => (
            <Draggable key={header.header} draggableId={header.header} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`px-4 sm:px-0 py-2 text-white font-semibold cursor-pointer rounded hover:bg-gray-300 flex-1 items-center ${index === 0 ? "lg:pl-12" : "px-4"}`}
                >
                  <div className={`flex ${index === headers.length - 1 ? 'justify-end lg:pr-8' : 'text-left'}`}>
                    <span>{header.header}</span>
                    <img 
                      src="./select-square-svgrepo-com.svg"
                      alt="Search"
                      className="h-6 w-5 ml-2 filter invert hidden sm:block"
                    />
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
</div>

  );
};

export default TableHeader;
