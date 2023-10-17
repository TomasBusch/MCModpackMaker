import * as HeroIcons from '@heroicons/react/24/outline';
// import { Header, Section, Text } from "react-aria-components";
import { ComboBox as AriaComboBox, Button, Input, Item, Label, ListBox, Popover } from "react-aria-components";


export function ComboBox({label="", items=[]}: {label?: string , items?: string[]}) {
  return (
    <>
    <AriaComboBox className="w-full">
      <Label>{label}</Label>
      <div className="flex py-1 rounded-md bg-zinc-700">
        <Input  className={
          (
            ({ isFocused, isDisabled, isHovered, isFocusVisible, isInvalid }) => 
            (isFocused ? 'outline-none' : '')     +" "+
            (isDisabled ? 'outline-none' : '')    +" "+
            (isHovered ? 'outline-none' : '')     +" "+
            (isFocusVisible ? 'outline-none' : '')+" "+
            (isInvalid ? 'outline-none' : '')     +" "+
            'bg-transparent flex-1 h-6 px-3'
          )
        }/>
        <Button className="px-2"><HeroIcons.ChevronUpDownIcon className="h-5 text-zinc-400"/></Button>
      </div>
      <Popover>
        <ListBox className="bg-zinc-700 text-zinc-300 w-[var(--trigger-width)] rounded-md">
          {items.map( (item) => 
            <Item className="p-2 px-3 rounded-md hover:bg-zinc-600">{item}</Item>
          )}
        </ListBox>
      </Popover>
    </AriaComboBox>
    </>
  );
}