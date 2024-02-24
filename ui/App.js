import React,{useState} from 'react';
import {Select} from "./components/Select"
import { Header } from './components/Header';
import List from './components/List';
import { Summary } from './components/Summary';

export const App = () => {
  //Here i created selectedCommunity so i could pass the community that was selected in my Select component
  //To my List component, the "selectedCommunity" store the community, the method handleSelectCommunity is
  //Passed as a property to "Select" and it's called every time the user change community.
  //Inside the "handleSelectCommunity" the "setSelectedCommunity" is updated with the ney value
  const [selectedCommunity,setSelectedCommunity] = useState()

  const handleSelectCommunity = (community) =>{
    setSelectedCommunity(community)
  }

  return(
    <>
    <Header />
    <Select onCommunityChange={handleSelectCommunity}/>
    <Summary selectedCommunity={selectedCommunity} />
    <List selectedCommunity={selectedCommunity}/>
    </>
    
  )
 
};
