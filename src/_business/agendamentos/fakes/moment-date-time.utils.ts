import { DateTimeUtils } from '../date-time.utils';
import * as moment from 'moment';

export class MomentDateTimeUtils implements DateTimeUtils {
  addHours(date: Date, amount: number): Date {
    return moment(date).add(amount, 'hours').toDate();
  }
}
