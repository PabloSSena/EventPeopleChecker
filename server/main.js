import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../infra/initial-data';
//In the lines above i'm importing the collections and methods so the server can know they exist
import { Communities } from '../communities/communities';
import { People } from '../people/people';
import { Controller } from '../api/Controller';
import '../communities/communitiesMethods';
import '../people/peopleMethods';
import '../api/ControllerMethods';

Meteor.startup(() => {
  // DON'T CHANGE THE NEXT LINE
  loadInitialData();
  // YOU CAN DO WHATEVER YOU WANT HERE

  if (Controller.find().count()) {
    return;
  }
  const commu = Communities.find({}).fetch();
  commu.map((commuItem) =>
      Controller.insert({
      peopleInEvent: 0,
      peopleNotChecked: 0,
      communityId:commuItem._id
  })
  )

});
