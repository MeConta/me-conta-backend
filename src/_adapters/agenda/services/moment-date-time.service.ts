import { DateTimeService } from '../../../_business/agenda/interfaces/date-time.service';
import * as moment from 'moment';

export class MomentDateTimeService implements DateTimeService {
  addHours(date: Date, amount: number): Date {
    return moment(date).add(amount, 'hours').toDate();
  }

  endOfDay(date: Date): Date {
    return moment(date).endOf('day').toDate();
  }

  startOfDay(date: Date): Date {
    return moment(date).startOf('day').toDate();
  }
}
