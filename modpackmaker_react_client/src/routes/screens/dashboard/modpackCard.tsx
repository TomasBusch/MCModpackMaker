import React from 'react';
import { Button } from 'react-aria-components';

export default function ModpackCard(props: { data: {title: string, version: string} }) {
  
  const handleCardClick = () => {
    console.log("click");
  };
  
  return (
    <div className='relative flex flex-col items-center overflow-hidden border rounded-md shadow-md select-none bg-zinc-800 border-zinc-700' onClick={handleCardClick}>
        <span className='absolute right-0 p-2 bg-zinc-800/70 backdrop-blur-lg'>{props.data.version}</span>
        <img draggable="false" className='w-full aspect-square bg-zinc-700' src="https://picsum.photos/id/53/200"/>
        <div className='flex flex-col items-center w-full gap-4 p-4'>
        <span>{props.data.title}</span>
        <Button className={
          ({isFocused, isPressed, isHovered}) => 
          (isHovered && !isPressed ? "bg-blue-400" : "")+" "+
          (isFocused ? "outline-none" : "")+" "+
          (isPressed ? "bg-blue-600" : "")+" "+
          (!isPressed && !isHovered ? "bg-blue-500" : "")+" "+
          "w-full px-4 py-1 rounded-md transition-all outline-none"
        }
        >Download</Button>
        </div>
    </div>
  );
}
