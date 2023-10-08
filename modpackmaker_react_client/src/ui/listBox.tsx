import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment, useState } from 'react';

export default function ListBox({options}: { options: {id: number | string, name: string, disabled: boolean}[] }) {
  const [selected, setSelected] = useState(options[0]);
  const [query, setQuery] = useState('');

  const filteredoptions =
    query === ''
      ? options
      : options.filter((option) =>
          option.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <div className="mt-1">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative">
          <div className="relative w-full overflow-hidden text-left rounded-lg shadow-md cursor-default bg-zinc-800 focus:outline-none sm:text-sm">
            <Combobox.Input
              className="w-full py-2 pl-3 pr-10 text-sm leading-5 border-none bg-zinc-700 focus:ring-0 focus:outline-none text-zinc-300"
              displayValue={(option: {id: number | string, name: string, disabled: boolean}) => option.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="w-5 h-5 text-zinc-400"  aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute w-full h-32 py-1 mt-1 overflow-auto text-base rounded-md shadow-lg bg-zinc-700 max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm scrollbar scrollbar-track-transparent scrollbar-thumb-sky-600 scrollbar-thumb-rounded-md scrollbar-w-1">
              {filteredoptions.length === 0 && query !== '' ? (
                <div className="relative px-4 py-2 cursor-default select-none text-zinc-300">
                  Nothing found.
                </div>
              ) : (
                filteredoptions.map((person) => (
                  <Combobox.Option value={person} key={person.id} className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-sky-600 text-zinc-100 font-bold' : 'text-zinc-400'
                      }`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-zinc-100 font-bold' : 'text-sky-600'
                            }`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}