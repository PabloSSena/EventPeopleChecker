import React from 'react'
import { useState } from 'react'
import {Meteor} from "meteor/meteor";
import CheckInButton from './CheckInButton';
import { format } from 'date-fns';

function List({ selectedCommunity }) {
    const [peopleData,setPeopleData] = useState([]);

    //I need this "if because in the first load of the page we don't have a community selected
    //the if is to prevent the app from crashing
    if(selectedCommunity){
        Meteor.call('people.getPeopleInCommunity',(selectedCommunity._id),(error,result) => { 
            if(error){
                console.log("There was an error:", error.reason)
            } else{
            setPeopleData(result);
        }
      })
    }

  return (
    <div className="w-full max-w-2xl mx-auto my-4 min-h-80 sm:my-8">
        {selectedCommunity ? (
            <table className="mx-auto">
                <thead>
                    <tr className="text-xs uppercase border-b sm:text-sm text-palette-primary border-palette-light">
                      <th className=""></th>
                      <th className="">Full Name</th>
                      <th className="">Company name</th>
                      <th className="">Title</th>
                      <th className="">Check-in</th>
                      <th className="opacity-0">Check-in</th> {/* I'm doing this owrk around to the list be prettier*/}
                      <th className="">Check-out</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-palette-lighter">
                    {peopleData.map((person) => (
                      <tr key={person._id} className="text-sm text-center text-gray-600 sm:text-base">
                            <td className="px-4 py-8 font-medium border-b font-primary sm:px-6 border-palette-light">
                            <CheckInButton person = {person}/>
                            </td>
                            <td className="px-4 py-8 font-medium border-b font-primary sm:px-6 border-palette-light">
                            <span>{person.firstName} { person.lastName}</span>
                            </td>
            
                            <td className="font-medium border-b font-primary border-palette-light">
                            <span>{person.companyName}</span>
                            </td>
            
                            <td className="px-4 py-8 font-medium border-b font-primary sm:px-6 border-palette-light">
                            <span>{person.title}</span>
                            </td>

                            <td className="px-4 py-8 font-medium border-b font-primary sm:px-6 border-palette-light">
                            <span>{person.checkIn ? (format(person.checkIn, 'MM/dd/yyyy,HH:mm')) :("N/A")}     </span>
                            </td> 
                            <td className="px-4 py-8 font-medium border-b font-primary sm:px-6 border-palette-light">
                            <span>{}</span>
                            </td> 
                            <td className="px-4 py-8 font-medium border-b font-primary sm:px-6 border-palette-light">
                            <span>{person.checkOut ? (format(person.checkOut, 'MM/dd/yyyy,HH:mm')) :("N/A")}</span>
                            </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
        ):(<a></a>)}
    </div>
  )
}

export default List
