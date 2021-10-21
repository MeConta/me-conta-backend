import {
  DateUnits,
  IDateAdd,
  IDateEndOfDay,
  IDateGreaterThanService,
  IDateStartOfDay,
} from '../../../_business/agenda/interfaces/date-time.service';
import * as moment from 'moment';

export class MomentDateTimeService
  implements IDateAdd, IDateStartOfDay, IDateEndOfDay, IDateGreaterThanService
{
  add(date: Date, amount: number, unit = DateUnits.HOURS): Date {
    return moment(date).add(amount, unit).toDate();
  }

  startOfDay(date: Date): Date {
    return moment(date).startOf('day').toDate();
  }

  endOfDay(date: Date): Date {
    return moment(date).endOf('day').toDate();
  }

  dateGreaterThan(date: Date, than: Date): boolean {
    return moment(date).isAfter(than);
  }
}
