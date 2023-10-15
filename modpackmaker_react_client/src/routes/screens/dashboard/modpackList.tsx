import React from 'react';
import ModpackCard from './modpackCard';

export default function ModpackList(props: {modpacks: string[]}) {
  return (
    <>
    <div className='grid w-full gap-8 p-8 grid-cols-[repeat(auto-fit,minmax(6em,12em))] justify-center'>
    {props.modpacks.map( (e) => 
        <ModpackCard key={e} data={{title: e, version: "1.20.1"}} />
    )}
    </div>
    </>
  );
}
