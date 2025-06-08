import React, { useState } from 'react';
import { Input } from './input';
import { useRouter } from "next/navigation";

interface ResultItem {
  label: string;
  path: string;
}

interface SearchBarProps {
  results: ResultItem[];
}

const SearchBar: React.FC<SearchBarProps> = ({ results }) => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<ResultItem[]>([]);

  const searchFunction = (query: string) => {
    const filtered = results.filter(item =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <Input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          searchFunction(e.target.value);
        }}
        className="bg-[#F5F6F7] w-full p-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="Search in HRIS"
         icon={<svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M17.5 18L13.875 14.375M15.8333 9.66667C15.8333 13.3486 12.8486 16.3333 9.16667 16.3333C5.48477 16.3333 2.5 13.3486 2.5 9.66667C2.5 5.98477 5.48477 3 9.16667 3C12.8486 3 15.8333 5.98477 15.8333 9.66667Z"
                stroke="currentColor"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>}
      />
      {query && (
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
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
              <div className="px-4 py-2 text-sm text-gray-600">Feature:</div>
              {searchResults.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    handleNavigation(item.path);
                    setQuery('');
                    setSearchResults([]);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item.label}
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
