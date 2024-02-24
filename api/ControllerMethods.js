
//I'm creating this new collection to controll how manny people are in the event and where they work

import { useTracker } from 'meteor/react-meteor-data';
import { Controller } from './Controller';
import { Communities } from '../communities/communitiesMethods';

const manipulatingString = (string) =>{
    var rmDot = string.replace(".", "_") //Removing dot because it was impeding me from save the data correctly
    const encodedName = encodeURIComponent(rmDot)

    return encodedName;
}

Meteor.methods({
    
    'controll.increment'(communityId){
        const event = useTracker(() => Controller.find({communityId:communityId}).fetch());
        Controller.update(event[0]._id,{
            $inc:{  peopleInEvent:1 }
        })
    },

    'controll.decrement'(communityId){
        const event = useTracker(() => Controller.find({communityId:communityId}).fetch());
        if(event[0].peopleInEvent > 0){
            Controller.update(event[0]._id,{
                $inc:
                    {
                        peopleInEvent:-1
                    }
            })
        }
    },

    'controll.getCommunity'(communityId){
        return useTracker(() => Controller.find({communityId:communityId}).fetch());
    },

    'controll.incrementCompanies'({communityId,companyName}){//Adding the companies that the guests work when they are checked-in
        const controller = Controller.find({communityId:communityId}).fetch();

        const manipulatedString = manipulatingString(companyName)
        if(controller[0][manipulatedString]){
            Controller.update(controller[0]._id,{
                $inc:{[manipulatedString]:1}
            })
        }
        else{
            Controller.update(controller[0]._id,{
                $set:{
                    [manipulatedString]:1 
                } 
            })
        }
    },

    'controll.decrementCompanies'({communityId,companyName}){//Adding the companies that the guests work when they are checked-in
        const controller = Controller.find({communityId:communityId}).fetch();
        const manipulatedString = manipulatingString(companyName)
        var excludeField = false

        if(controller[0][manipulatedString] == 1){
            excludeField = true
        }

        if(controller[0][manipulatedString]){ //Checking if the field exist, if we don't check he will create a field with -1
            Controller.update(controller[0]._id,{
                $inc:{[manipulatedString]: -1}
            })
        }

        if(excludeField){//if everybody from this company have gone away from the event, I don't want the company name showing up
            Controller.update(controller[0]._id,{
                $unset:{[manipulatedString]:1}
            })
        }
    },

    'controll.getCompanies'(communityId){
        return useTracker(() => Controller.find({communityId:communityId}, {fields:{
             _id:0,
             peopleInEvent:0,
             peopleNotChecked: 0,
             communityId: 0
            }}).fetch());
    },

})

