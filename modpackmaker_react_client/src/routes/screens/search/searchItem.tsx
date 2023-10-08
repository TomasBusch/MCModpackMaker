import { TagIcon } from '@heroicons/react/24/outline';
import NoLogo from './noLogo';

type ModItem ={
    title: string,
    author: string,
    icon: string,
    description: string,
    categories: string[],
    downloads: number,
    followers: number,
};

type ModItemProp = {
    item: ModItem,
}

export default function SearchItem({item}:ModItemProp) {

const formatter = Intl.NumberFormat("en", { notation: "compact" });
    
  return (
    <>
    <div className="flex flex-wrap items-center w-full gap-4 p-4 my-4 border rounded-md shadow-md bg-zinc-800 border-zinc-700 md:flex-nowrap">
        {item.icon == "" ?<NoLogo/> : <img src={item.icon} className='object-contain w-20 h-20 rounded-lg bg-zinc-700'/>}
    <div className="flex flex-col basis-1/2 grow">
        <div className='flex items-center flex-1 gap-4'>
            <div className='inline text-xl font-semibold'>{item.title}</div>
            <div className='inline text-sm font-light underline'>{item.author}</div>
        </div>
        <div className='flex-1 gap-2'>
            <div className='inline text-base font-normal text-zinc-400'>{item.description}</div>
        </div>
        <ul className='flex flex-wrap justify-start text-sm font-light gap-x-4 text-zinc-400'>
        {item.categories.map((category) => 
            <li className='flex items-center gap-1' key={category}><TagIcon className='h-4'/><div>{category}</div></li>
        )}  
        </ul>
    </div>
    <div className='flex flex-col justify-center font-light basis-32 text-zinc-300'>
        <div className=''>{formatter.format(item.downloads)} downloads</div>
        <div className=''>{formatter.format(item.followers)} followers</div>
    </div>
    <div className='flex items-center justify-center basis-32'>
        <button className="w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-sky-600 bg-opacity-80 hover:bg-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">Add</button>
    </div>
    </div>
    </>
  );
};
