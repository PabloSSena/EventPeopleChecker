import React from "react"
import {Meteor} from "meteor/meteor";

export const CheckInButton = ({person}) => {

  //Here i'm checking if the person was already checked-in, if it wasn't i save the check-in
  //If it was i save the check-out, i also controll how manny people are in the event
  const handleCheckIn = () =>{
    console.log(person)
    if(!person.checkIn){

      Meteor.call('people.updateCheckIn',(person._id),(error,result) => { 
        if(error){
            console.log("There was an error in people.UpdateCheckIn:", error.reason)
        }
      })                                                 

      Meteor.call('controll.increment',(person.communityId),(error,result) => { 
        if(error){
            console.log("There was an error in controll.increment:", error.reason)
        }
      })
      //This part is to controll the amount of people from each company are in the event
      // I putted inside a if because not everybody has the field companyName
      if(person.companyName){
        Meteor.call('controll.incrementCompanies',({communityId:person.communityId,companyName:person.companyName}),(error,result) => { 
          if(error){
              console.log("There was an error in controll.increment:", error.reason)
          }
        })
      }
    }
    else {
      Meteor.call('people.updateCheckOut',(person._id),(error,result) => { 
        if(error){
            console.log("There was an error in people.UpdateCheckOut:", error.reason)
        }
      })

      Meteor.call('controll.decrement',(person.communityId),(error,result) => { 
        if(error){
            console.log("There was an error in controll.decrement:", error.reason)
        }
      })

      if(person.companyName){
        Meteor.call('controll.decrementCompanies',({communityId:person.communityId,companyName:person.companyName}),(error,result) => { 
          if(error){
              console.log("There was an error in controll.decrementCompanies:", error.reason)
          }
        })
      }

    }
  }

  //Here i'm doing my logic to "Check-out" appears only after five seconds
  //my idea is: Get the current time and compare it with the time the user pressed the button
  //Inside the button i'm doing the logic to see if already passed five seconds and also comparing if the
  //Person object has the "checkIn" attribute, if it doesn't have i show "Check-In" if it has i show "Check-out"
  const currentDate = new Date();
  const fiveSeconds = 5 * 1000; // 5 seconds in milliseconds

  return (
    <button onClick={handleCheckIn} type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-1.5 mt-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
        {person.checkIn != null && currentDate - person.checkIn >= fiveSeconds ? ("Check-out"): ("Check-in")}
    </button>
  )
}

export default CheckInButton
