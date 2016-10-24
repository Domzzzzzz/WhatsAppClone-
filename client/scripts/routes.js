// This file contains the routes & states for the views
// Routes & states defined using angular-ui-router
// App has these tabs: favorites, recents, contacts, chats, and settings

import { Config } from 'angular-ecmascript/module-helpers';

export default class RoutesConfig extends Config {
  configure() {
    this.$stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'client/templates/tabs.html'
      })
      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'client/templates/chats.html'
          }
        }
      });

    this.$urlRouterProvider.otherwise('tab/chats');
  }
}
 
RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
