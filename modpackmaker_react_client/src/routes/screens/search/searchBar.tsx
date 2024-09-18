import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { searchQueryStore } from './data/stores/searchQueryStore';

import * as HeroIcons from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';
import ToggleButton from '../../../ui/toggleButton';

export default function SearchBar() { 
  const [query, setQuery] = useState("");
  const setSearchQuery = useAtom(searchQueryStore)[1];

  useEffect(() => {
    const debouncedQuery = debounce((value: string) => {
      setSearchQuery(value);
    }, 200);

    debouncedQuery(query);
    
    return () => {
      debouncedQuery.cancel && debouncedQuery.cancel();
    };
  }, [query, setSearchQuery]);
  
  return (
    <div className="flex items-center w-full gap-x-4">
        <div className="flex w-full h-10 border rounded-md drop-shadow-xl bg-zinc-800/50 border-zinc-700 backdrop-blur-md">
          <HeroIcons.MagnifyingGlassIcon className="h-full p-2 pl-4"/>
          <input value={query} className="w-full h-full p-4 pl-1 bg-transparent rounded-md outline-none appearance-none drop-shadow-xl" type="search" onChange={event => setQuery(event.target.value)} placeholder="Search for a Mod" />
        </div>
          <button className="md:hidden"><HeroIcons.AdjustmentsHorizontalIcon className="h-10 p-2 border rounded-md drop-shadow-xl bg-zinc-800/50 border-zinc-700 backdrop-blur-md"/></button>
          <div className='hidden h-10 sm:block backdrop-blur-md'><ToggleButton/></div>
    </div>
  );
}
