// app/components/SearchSection.tsx
"use client"

import { useState, useEffect } from 'react'
import { useLeaderboardContext } from '../context/LeaderboardContext'
import { getAutoComplete } from '@/services/apiServices';

export default function SearchSection() {
  const { setSearchText, viewType, toggleViewType } = useLeaderboardContext()
  const [inputValue, setInputValue] = useState<string>('');
  const [itemSelected, setItemSelected] = useState<boolean>(false);
  const [suggestedItems, setSuggestedItems] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);
  let typingTimeout: ReturnType<typeof setTimeout>;

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    setActiveSuggestionIndex(-1);
  };

  const changeInputValue = (value: string) => {
    setInputValue(value);
    setItemSelected(true);
  }
  // Handle key navigation and selection
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' && activeSuggestionIndex < suggestedItems.length - 1) {
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    } else if (e.key === 'ArrowUp' && activeSuggestionIndex > 0) {
      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    } else if (e.key === 'Enter' && activeSuggestionIndex >= 0) {
      changeInputValue(suggestedItems[activeSuggestionIndex]);
      setShowSuggestions(false);
    }
  };

  // Hide suggestions when input loses focus
  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100); // Delay for click selection
  };

  useEffect(() => {
    if (itemSelected === false) {
      typingTimeout = setTimeout(() => {
        if (inputValue.length >= 2) {
          getAutoComplete(inputValue)
            .then((data) => {
              setSuggestedItems(data)
              setShowSuggestions(true);
            })
            .catch((error) => console.error(error));
          setShowSuggestions(true);
        } else {
          setShowSuggestions(false);
        }
      }, 500);
    }
    setItemSelected(false);
    return () => clearTimeout(typingTimeout); // Cleanup timeout on unmount
  }, [inputValue]);

  return (
    <div className="relative flex items-center gap-2 mx-8">
      <div className='w-full flex relative'>
        <div className="flex-grow relative">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder="Search..."
            className="bg-[#2e2a4c] text-white placeholder-gray-400 h-full rounded-l w-full"
          />
          {showSuggestions && (
            <ul className="absolute top-full left-0 w-full border bg-[#2e2a4c] max-h-48 overflow-y-auto z-10 text-white">
              {suggestedItems.map((suggestedItem, index) => (
                <li
                  key={suggestedItem}
                  className={`p-2 cursor-pointer ${index === activeSuggestionIndex ? 'bg-[#2c2250]' : 'bg-[#251e40]'
                    }`}
                  onMouseDown={() => changeInputValue(suggestedItem)}
                >
                  {suggestedItem}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          className="bg-[#2d0f57] text-white px-4 py-2 h-full rounded-r flex items-center"
          onClick={() => setSearchText(inputValue)}
        >
          <img
            src="./icons8-search.svg"
            alt="Search"
            className='h-6 w-5 mr-2 filter invert'
          />
        </button>
      </div>
      <button
        className={`${viewType === "view1" ? "bg-[#2d0f57]" : "bg-[#53419c]"} text-white px-4 py-2 h-full rounded`}
        onClick={toggleViewType}
      >
        <img
          src="./sort-by-svgrepo-com.svg"
          alt="Search"
          className='h-6 w-5 mr-2 filter invert'
        />
      </button>


    </div>

  )
}
