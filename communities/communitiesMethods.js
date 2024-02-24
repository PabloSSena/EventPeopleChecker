
//Here i create the method so i can acces things from the server side on the client side
import { useTracker } from 'meteor/react-meteor-data';
import { Communities } from './communities';

Meteor.methods({
    'communities.getAll'(){
        return useTracker(() => Communities.find({}).fetch());
    }
})

