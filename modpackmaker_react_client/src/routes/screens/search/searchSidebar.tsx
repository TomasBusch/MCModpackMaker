import * as HeroIcons from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import ListBox from '../../../ui/listBox';
import { modrinthCategories } from './data/categories/modrinthCategories';
import { modrinthLoaders } from './data/loaders/modrinthLoaders';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Button, Item, Label, Popover, ListBox as AriaListBox, Select, SelectValue} from 'react-aria-components';
import { ComboBox } from '../../../ui/comboBox';

export default function SearchSidebar() {
    const [allVersions, setAllVersions] = useState(false);
      
    
    return (
        <div className="w-0 overflow-y-auto transition-all shadow-md xl:h-full rounded-r-md xl:rounded-md md:border border-zinc-700 md:w-16 xl:w-80 absdolute bg-zinc-800/50 scrollbar scrollbar-track-transparent scrollbar-thumb-sky-600 scrollbar-thumb-rounded-md scrollbar-w-1 backdrop-blur-md">
        <div className="h-full overflow-x-hidden xl:p-4 scrollbar scrollbar-track-transparent scrollbar-thumb-sky-600 scrollbar-thumb-rounded-md scrollbar-w-1 ">
        {/* Large Sidebar */}
        <div className='flex-col sm:hidden xl:flex'>
            <p className='my-2 text-lg font-bold select-none'>Categories</p>
            {modrinthCategories.map((category) => 
            <div key={category.value} className='flex ml-2'>
                <input id={category.value} type="checkbox" value="" name={category.value} className="w-4 h-4 transition-all border-blue-600 rounded appearance-none bg-zinc-700 checked:border-4 checked:bg-zinc-600 checked:zhadow-inner hover:bg-zinc-600" ></input>
                <Label htmlFor={category.value} className="flex-1 ml-2 text-sm font-medium select-none text-zinc-900 dark:text-zinc-300">{category.label}</Label>
            </div>
            )}
            <p className='my-2 text-lg font-bold select-none'>Loaders</p>
            {modrinthLoaders.map((loaders) => 
            <div key={loaders.value} className='flex ml-2'>
                <input id={loaders.value} type="checkbox" value="" name={loaders.value} className="w-4 h-4 transition-all border-blue-600 rounded appearance-none bg-zinc-700 checked:border-4 checked:bg-zinc-600 checked:zhadow-inner hover:bg-zinc-600"></input>
                <Label htmlFor={loaders.value} className="flex-1 ml-2 text-sm font-medium select-none text-zinc-900 dark:text-zinc-300">{loaders.label}</Label>
            </div>
            )}
            <p className='my-2 text-lg font-bold select-none'>Minecraft Version</p>
            <div className='flex ml-2'>
            <input id="allVersions" type="checkbox" checked={allVersions} name="allVersions" className="w-4 h-4 transition-all border-blue-600 rounded appearance-none bg-zinc-700 checked:border-4 checked:bg-zinc-600 checked:zhadow-inner hover:bg-zinc-600" onChange={() => setAllVersions(!allVersions)}></input>
            <Label htmlFor="allVersions" className="flex-1 ml-2 text-sm font-medium select-none text-zinc-900 dark:text-zinc-300">Show all minecraft versions</Label>
            </div>
            {/* <VersionListBox allVersions={allVersions}/> */}
            <ComboBox items={["1.20.1", "1.19.2", "1.12.2"]}></ComboBox>
            <p className='my-2 text-lg font-bold select-none'>Open Source</p>
            <div className='flex ml-2'>
            <input id="openSource" type="checkbox" name="openSource" className="w-4 h-4 transition-all border-blue-600 rounded appearance-none bg-zinc-700 checked:border-4 checked:bg-zinc-600 checked:zhadow-inner hover:bg-zinc-600"></input>
            <Label htmlFor="openSource" className="flex-1 ml-2 text-sm font-medium select-none text-zinc-900 dark:text-zinc-300">Only show open source mods</Label>
            </div>
        </div>
        {/* Compact Sidebar */}
        <div className='flex-col md:flex sm:hidden xl:hidden'>
            <Button><HeroIcons.Bars3BottomLeftIcon className='w-16 p-4 bg-transparent hover:bg-zinc-700'/></Button>
            <Button><HeroIcons.ArchiveBoxArrowDownIcon className='w-16 p-4 bg-transparent hover:bg-zinc-700'/></Button>
            <Button><HeroIcons.ServerStackIcon className='w-16 p-4 bg-transparent hover:bg-zinc-700'/></Button>
            <Button><HeroIcons.ClipboardDocumentListIcon className='w-16 p-4 bg-transparent hover:bg-zinc-700'/></Button>
            <Button><HeroIcons.LockOpenIcon className='w-16 p-4 bg-transparent hover:bg-zinc-700'/></Button>
        </div>
        </div>
        </div>
    );
}

type MojangMinecraftVersionQuery = {
    latest: {
        release: string,
        snapshot: string
    }
    versions: minecraftVersion[]
};

type minecraftVersion = {
        id: string,
        type: string,
        url: string,
        time: string,
        releaseTime: string,
        sha1: string,
        complianceLevel: number
};

type minecraftVersionData = {
        id: string | number,
        name: string,
        disabled: boolean,
};

function VersionListBox({allVersions}: {allVersions: boolean}){
    
    const { data, isSuccess, isLoading, isError }= useQuery({ 
    queryKey: ['minecraft_versions', allVersions], 
    
    queryFn: ():Promise<minecraftVersionData[]> => 
        {
            return axios
            .get<MojangMinecraftVersionQuery>(`https://launchermeta.mojang.com/mc/game/version_manifest_v2.json`, {})
            .then((res) => res.data.versions
                .filter((e) => e.type === "release" || allVersions )
                .map((e) => {
                    return{id: e.id, name: e.id, disabled: false};
                    }
                )
            );
        },
    }); 

    if (isLoading) {
        return <></>;
    }

    if (isError) {
        return <></>;
    }
    
    if(isSuccess){
    return(
        <>
            <ListBox options={data}/>
        </>
    );
    }
}
