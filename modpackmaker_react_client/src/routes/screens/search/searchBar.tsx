import { useCallback, useEffect, useState } from 'react';
import { searchQueryStore } from './data/stores/searchQueryStore';
import { debounce } from 'lodash';

import * as HeroIcons from '@heroicons/react/24/outline';
import ToggleButton from '../../../ui/toggleButton';
import { useAtom } from 'jotai';

export default function SearchBar() { 
  const [query, setQuery] = useState("");
  const setSearchQuery = useAtom(searchQueryStore)[1];

  const debounceQuery = useCallback(debounce((value: string) => {
    setSearchQuery(value);
  }, 200),[]);

  useEffect(() => {
    debounceQuery(query);
  }, [query]);
  
  return (
    <div className="flex items-center w-full gap-x-4">
        <div className="flex w-full h-10 border rounded-md drop-shadow-xl bg-zinc-800 border-zinc-700">
          <HeroIcons.MagnifyingGlassIcon className="h-full p-2 pl-4"/>
          <input value={query} className="w-full h-full p-4 pl-1 rounded-md outline-none appearance-none drop-shadow-xl bg-zinc-800" type="search" onChange={event => setQuery(event.target.value)} placeholder="Search for a Mod" />
        </div>
          <button className="md:hidden"><HeroIcons.AdjustmentsHorizontalIcon className="h-10 p-2 border rounded-md drop-shadow-xl bg-zinc-800 border-zinc-700"/></button>
          <div className='hidden h-10 sm:block'><ToggleButton/></div>
    </div>
  );
}
