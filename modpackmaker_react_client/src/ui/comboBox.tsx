import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';


const Localoptions = [
  { id: 1, name: 'Wade Cooper', disabled: false },
  { id: 2, name: 'Arlene Mccoy', disabled: false },
  { id: 3, name: 'Devon Webb', disabled: false },
  { id: 4, name: 'Tom Cook', disabled: false },
  { id: 5, name: 'Tanya Fox', disabled: false },
  { id: 6, name: 'Hellen Schmidt', disabled: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function ComboBox({options=Localoptions, label=""}: { options: {id: number | string, name: string, disabled: boolean}[], label: string }) {
  const [selected, setSelected] = useState(options[0]);
  // const [query, setQuery] = useState('');

  // const filteredoptions =
  //   query === ''
  //     ? options
  //     : options.filter((option) =>
  //         option.name
  //           .toLowerCase()
  //           .replace(/\s+/g, '')
  //           .includes(query.toLowerCase().replace(/\s+/g, ''))
  //       );



    return (
        <Combobox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Combobox.Label>
          <div className="relative mt-2">
            <Combobox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="block ml-3 truncate">{selected.name}</span>
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                <ChevronUpDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              </span>
            </Combobox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Combobox.Options className="absolute z-10 w-full h-32 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Combobox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {option.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Transition>
          </div>
        </>
      )}
    </Combobox>
    );
}
