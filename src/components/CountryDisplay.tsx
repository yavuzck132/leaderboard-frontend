import React from "react";
import Flag from "react-world-flags";
import { countries } from 'country-data';

interface CountryDisplayProps {
  countryCode: string;
}

const CountryDisplay: React.FC<CountryDisplayProps> = ({ countryCode }) => {
  const countryName = countries[countryCode];

  return (
    <div className="flex items-center space-x-2">
      <Flag code={countryCode} className="w-6 h-6 rounded-full object-cover" alt={`${countryName.alpha3} flag`} />
      <span className="hidden sm:inline">{countryName.name}</span>
      <span className="inline sm:hidden">{countryName.alpha3}</span>
    </div>
  );
};

export default CountryDisplay;
