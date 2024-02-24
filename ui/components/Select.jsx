import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import React from 'react'
import {Meteor} from "meteor/meteor";



export const Select = ({onCommunityChange}) => {
  // My idea here is to use "communitiesData" to save the data that i receive from Communities
  // And use "selected" to see wich event the user choose
  const [communitiesData,setCommunitiesData] = useState([]);
  const [selected, setSelected] = useState([])
  // "isTrue" was created so i can know when the user clicks in any of the options from select
  // I made this because whe the user never clicked i want to show "Select an Event"
  const[isTrue, setIsTrue] = useState(false);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  if(communitiesData.length == 0){
    //Here i'm calling my getAll methods so i can use the communities data on the client 
    Meteor.call('communities.getAll',(error,result) => { 
      setCommunitiesData(result);
      [selected, setSelected] = useState(result[0]) 
    
  })
  }
  try {

  } catch (error) {
    console.log("error in communities.getAll ",error)
  }


  //This is the function that i use to change wich event is selected and if the user clicked in any of them
  const handleInputChange = (selected) => {
    setSelected(selected);
    onCommunityChange(selected);
    setIsTrue(true);
  };


  return (
    <Listbox className="w-3/5 mx-auto" value={selected} onChange={handleInputChange}>
      {({ open }) => (
        <div className="">
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="block ml-3 truncate">{ 
                  isTrue ? (selected.name) : (<span className="font-extrabold font-primary text-palette-primary">Select an Event</span>) 
                  }</span>
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                <ChevronUpDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base font-medium bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {communitiesData.map((event) => (
                  <Listbox.Option
                    key={event._id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white font-medium' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={event}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(selected ? 'font-medium' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {event.name}
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
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
}