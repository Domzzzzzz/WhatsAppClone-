import Ionic from 'ionic-scripts';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats, Messages } from '../../../lib/collections';

export default class ChatCtrl extends Controller {
  constructor() {
    super(...arguments);

    // use the $stateParams provider to get chat id
    this.chatId = this.$stateParams.chatId;
    this.isAndroid = Ionic.Platform.isWebView() && Ionic.Platform.isAndroid();
    this.isCordova = Meteor.isCordova;

    // helper fetches a chat/messages based on chat id
    this.helpers({
      messages() {
        return Messages.find({ chatId: this.chatId });
      },
      data() {
        return Chats.findOne(this.chatId);
      }
    });
  }

  // function that sends the message when enter or send button pressed
  // uses callMethod() to call the function on the server side
  sendMessage() {
    if (_.isEmpty(this.message)) return;

   this.callMethod('newMessage', {
     text: this.message,
     type: 'text',
     chatId: this.chatId
   });

   delete this.message;
  }

  // function that opens keyboard if viewed on android device
  inputUp () {
    if (this.isAndroid) {
      this.keyboardHeight = 216;
    }

    this.scrollBottom(true);
  }

  // function closes keyboard
  inputDown () {
    if (this.isAndroid) {
      this.keyboardHeight = 0;
    }

    this.$ionicScrollDelegate.$getByHandle('chatScroll').resize();
  }

  closeKeyboard () {
    if (this.isCordova) {
      cordova.plugins.Keyboard.close();
    }
  }

  scrollBottom(animate) {
    this.$timeout(() => {
      this.$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
    }, 300);
  }
}

// set the name of the chat controller for exporting
// inject $stateParams(chat id) to get a particular chat
ChatCtrl.$name = 'ChatCtrl';
ChatCtrl.$inject = ['$stateParams', '$timeout', '$ionicScrollDelegate'];
