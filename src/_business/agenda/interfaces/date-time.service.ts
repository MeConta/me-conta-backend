export interface DateTimeService {
  addHours(date: Date, amount: number): Date;

  startOfDay(date: Date): Date;

  endOfDay(date: Date): Date;
}
