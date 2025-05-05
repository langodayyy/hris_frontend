import React, { useState } from 'react';
import { Input } from './input';

interface SearchBarProps {
  suggestion: string[];
  results: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ suggestion, results }) => {
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const searchFunction = (query: string) => {
    const filteredSuggestions = suggestion.filter(suggestion =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
    const filteredResults = results.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults([...filteredSuggestions, ...filteredResults]);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Icon Search */}
      <svg
        className="text-gray-700 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M9.58317 17.5C13.9554 17.5 17.4998 13.9555 17.4998 9.58329C17.4998 5.21104 13.9554 1.66663 9.58317 1.66663C5.21092 1.66663 1.6665 5.21104 1.6665 9.58329C1.6665 13.9555 5.21092 17.5 9.58317 17.5Z"
          stroke="#595959"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.3332 18.3333L16.6665 16.6666"
          stroke="#595959"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          searchFunction(e.target.value);
        }}
        className="bg-[#F5F6F7] w-full p-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="Search in HRIS"
      />
      {query && (
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-500"
          onClick={() => {
            setQuery('');
            setSearchResults([]);
          }}
        >
          Clear
        </button>
      )}

      {query && (
        <div className="absolute left-0 right-0 bg-white border border-t-0 border-gray-300 shadow-lg max-h-60 overflow-y-auto">
          {searchResults.length > 0 ? (
            <>
              <div className="px-4 py-2 text-sm text-gray-600">Menu:</div>
              {suggestion
                .filter(suggestion => suggestion.toLowerCase().includes(query.toLowerCase()))
                .map((menu, idx) => (
                  <div key={idx} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    {menu}
                  </div>
                ))}
              <div className="px-4 py-2 text-sm text-gray-600">Data:</div>
              {results
                .filter(item => item.toLowerCase().includes(query.toLowerCase()))
                .map((item, idx) => (
                  <div key={idx} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    {item}
                  </div>
                ))}
            </>
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
