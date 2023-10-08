import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { searchQueryStore } from './data/stores/searchQueryStore';
import SearchItem from './searchItem';
import { useAtom } from 'jotai';

type ModrinthCategories = "adventure" | "equipment" | "library" | "fabric" | "forge" | "game-mechanics";

type ModrinthSearchRes = {
    hits: ModrinthMod[]
}

type ModrinthMod = {
    "project_id": string,
    "project_type": string,
    "slug": string,
    "author": string,
    "title": string,
    "description": string,
    "categories": ModrinthCategories[],
    "display_categories": ModrinthCategories[],
    "versions": string[],
    "downloads": number,
    "follows": number,
    "icon_url": string,
    "date_created": Date,
    "date_modified": Date,
    "latest_version": string,
    "license": string,
    "client_side": string,
    "server_side": string,
    "gallery": string[],
    "featured_gallery": string,
    "color": number
}

export default function SearchResults() {
const searchQuery = useAtom(searchQueryStore)[0];

  
const { data, isSuccess }= useQuery({ 
    queryKey: ['modrinth_mod_search', searchQuery], 
    queryFn: ({ signal }):Promise<ModrinthSearchRes> => {
      return axios.get<ModrinthSearchRes>(`https://api.modrinth.com/v2/search?query=${searchQuery}`, {
        signal
      }).then((res) => res.data);
}});

  return (
    <>
    <div className="h-full px-2 overflow-x-hidden overflow-y-auto shadow-inner shadow-zinc-900 scrollbar scrollbar-track-transparent scrollbar-thumb-sky-600 scrollbar-thumb-rounded-md scrollbar-w-0 md:scrollbar-w-1">
    <div className="my-0">
    {isSuccess ? data.hits.map((mod) => (
            <SearchItem item={{
            title: mod.title,
            author: mod.author,
            icon: mod.icon_url,
            description: mod.description,
            categories: mod.categories,
            downloads: mod.downloads,
            followers: mod.follows,}}
            key={mod.project_id}/>
    )) : ""}
    </div>
    </div>
    </>
  );
}
