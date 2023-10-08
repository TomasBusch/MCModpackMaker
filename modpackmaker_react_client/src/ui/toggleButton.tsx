import { Switch } from '@headlessui/react';
import { Fragment, useState } from 'react';
import * as HeroIcons from '@heroicons/react/24/outline';

type onChangeFunc = {
  (checked: boolean): void
}

export default function ToggleButton({onChange=undefined}: {onChange: onChangeFunc | undefined } | Record<string, never>) {
    
  const [enabled, setEnabled] = useState(false);

  function handleChange(checked: boolean){
    setEnabled(checked);
    if(onChange){
    onChange(checked);
    }
  }

  return (
        <Switch checked={enabled} onChange={handleChange} as={Fragment}>
            {({ checked }) => (
                /* Use the `checked` state to conditionally style the button. */
                <button
                className={`${
                    checked ? 'bg-zinc-800' : 'bg-zinc-800'
                } relative flex items-center justify-items-center rounded-md hover:bg-zinc-700 border border-zinc-700`}
                >
                <div className='h-10 p-2'>
                {enabled ? 
                    <HeroIcons.ListBulletIcon className='h-full'/> : 
                    <HeroIcons.Squares2X2Icon className='h-full'/>
                }
                </div>
                </button>
            )}
        </Switch>
  );
}
