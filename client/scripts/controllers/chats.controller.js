import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats } from '../../../lib/collections';

export default class ChatsCtrl extends Controller {
  constructor() {
    super(...arguments);

    // helper returns chat data from collection
    this.helpers({
      data() {
        return Chats.find();
      }
    });
  }
  // Logic behind the delete button
  remove(chat) {
    Chats.remove(chat._id);
  }
}

// set the name of the chats controller for importing in other files 
ChatsCtrl.$name = 'ChatsCtrl';
