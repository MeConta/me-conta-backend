import {
  DateUnit,
  IDateAdd,
  IDateEndOf,
  IDateGreaterThan,
  IDateStartOf,
} from '../../../_business/agenda/services/date-time.service';
import * as moment from 'moment';

export class MomentDateTimeService
  implements IDateAdd, IDateStartOf, IDateEndOf, IDateGreaterThan
{
  add(date: Date, amount: number, unit = DateUnit.HOURS): Date {
    return moment(date).add(amount, unit).toDate();
  }

  startOf(date: Date, unit = DateUnit.DAYS): Date {
    return moment(date).startOf(unit).toDate();
  }

  endOf(date: Date, unit = DateUnit.DAYS): Date {
    return moment(date).endOf(unit).toDate();
  }

  greaterThan(date: Date, than: Date): boolean {
    return moment(date).isAfter(than);
  }
}
