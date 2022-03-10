import {
  DateUnit,
  IDateAdd,
  IDateEndOf,
  IDateGreaterThan,
  IDateStartOf,
} from '../../../_business/agenda/services/date-time.service';
import * as dayjs from 'dayjs';

export class MomentDateTimeService
  implements IDateAdd, IDateStartOf, IDateEndOf, IDateGreaterThan
{
  add(date: Date, amount: number, unit = DateUnit.HOURS): Date {
    return dayjs(date).add(amount, unit).toDate();
  }

  startOf(date: Date, unit = DateUnit.DAYS): Date {
    return dayjs(date).startOf(unit).toDate();
  }

  endOf(date: Date, unit = DateUnit.DAYS): Date {
    return dayjs(date).endOf(unit).toDate();
  }

  greaterThan(date: Date, than: Date): boolean {
    return dayjs(date).isAfter(than);
  }
}
