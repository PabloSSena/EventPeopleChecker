
//Here i create the method so i can acces things from the server side on the client side
import {People} from './people'
import { useTracker } from 'meteor/react-meteor-data';

Meteor.methods({
    'people.getAll'(){
        return useTracker(() => People.find({}).fetch());
    },

    'people.getPeopleInCommunity'(_id){
        return useTracker(() => People.find({communityId:_id}).fetch());
    },

    'people.updateCheckIn'(_id){
        const person = useTracker(() => People.find({_id:_id}).fetch());
        People.update(_id,{
            $set:{
                checkIn: new Date()
            }
        })
    },

    'people.updateCheckOut'(_id){
        const person = useTracker(() => People.find({_id:_id}).fetch());
        People.update(_id,{
            $set:{
                checkOut: new Date()
            }
        })
    },

    'people.findById'(_id){
        return useTracker(() => People.find({_id:_id}).fetch());
    },

    'people.getAllCompanies'(){
        return useTracker(() => People.find({companyName:{$exists:true, $ne:''}    },{fields:{
            _id:0,
            firstName:0,
            lastName:0,
            title:0,
            communityId:0,
            checkIn:0,
            checkOut:0
        }}).fetch());
    }
})

