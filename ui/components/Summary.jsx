import React,{useState,useEffect } from 'react';
import {Meteor} from "meteor/meteor";

export const Summary = ({selectedCommunity}) => {
  //Here i will bring the data for me to know who are checked-in, how manny people are not checked e how manny from each companie
    const[communityData,setCommunityData] = useState([]);
    const[peopleInList,setpeopleInList] = useState([]);
    const[companiesInList,setCompaniesInList] = useState([]);
    const[allCompanies,setAllCompanies] = useState([]);

    if(allCompanies.length == 0){
      Meteor.call('people.getAllCompanies', (error, result) => {
        if (error) {
          console.log('Error in controll.getCompanies ', error);
        } else {

          setAllCompanies(result)
        }
      });
    }

    //i'm using useEffect here to make sure i will only call the method when "selectedCommunity" change
    //Because if i don't do that it will create a lot of hard requests to the database and he will lag
    useEffect(() => {
      if (selectedCommunity) { //Making sure that i only call the methods when i have the Community, if don't do that the site will crash
        Meteor.call('people.getPeopleInCommunity', selectedCommunity._id, (error, result) => {
          console.log(result)
          setpeopleInList(result);
        });
      }
    }, [selectedCommunity]);

    //this method is not inside useEffect because if put it in the amount of people checked will not update
    if (selectedCommunity) {
      Meteor.call('controll.getCommunity', selectedCommunity._id, (error, result) => {
        if (error) {
          console.log('Error in controll.getCommunity ', error);
        } else {
          setCommunityData(result);
        }
      });

      Meteor.call('controll.getCompanies', selectedCommunity._id, (error, result) => {
        if (error) {
          console.log('Error in controll.getCompanies ', error);
        } else {
          setCompaniesInList(result);
        }
      });

    }

    const returningStringToOriginal = (string) =>{
      var rmDot = string.replace("_", ".") //Removing dot because it was impeding me from save the data correctly
      const decodedName = decodeURIComponent(rmDot)
  
      return decodedName;
  }

  return(
    <div className='ml-8'>
      {communityData[0] && companiesInList[0] ? (
        <div className='ml-8 mr-4'>
          <h3 className="">
            People in the event right now: {communityData[0].peopleInEvent}
          </h3>
          <h3 className="mr-4">People not checked-in: {peopleInList.length - communityData[0].peopleInEvent}</h3>
          <div className='mr-4'>
            <h3>People by company in the event right now: </h3>
            {Object.entries(companiesInList[0]).map(([key, value], index) =>(
              <span key={index}> {returningStringToOriginal(key)}: ({value}), </span>
            ))}
          </div>
        </div>
        ):("")}
    </div>
    
  )
 
};
