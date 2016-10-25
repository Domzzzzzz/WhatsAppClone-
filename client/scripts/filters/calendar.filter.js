// This file is a filter for the Moment module
// Used for formatting the date of the last received message
// Format will depend on when the msg was received in relation to current time
// If msg received yesterday then 'Yesterday' is displayed
// If msg received this week then the name of the day is displayed
// If msg received today then the time is displayed
// If msg received a week or more ago then the date is displayed 

import Moment from 'moment';
import { Filter } from 'angular-ecmascript/module-helpers';

export default class CalendarFilter extends Filter {
  filter(time) {
    if (!time) return;

    return Moment(time).calendar(null, {
      lastDay : '[Yesterday]',
      sameDay : 'LT',
      lastWeek : 'dddd',
      sameElse : 'DD/MM/YY'
    });
  }
}

CalendarFilter.$name = 'calendar';
