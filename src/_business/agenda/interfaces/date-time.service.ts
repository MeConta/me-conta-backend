export enum DateUnits {
  YEARS = 'year',
  MONTHS = 'months',
  WEEKS = 'week',
  DAYS = 'day',
  HOURS = 'hour',
  MINUTES = 'minute',
  SECONDS = 'seconds',
  MILLISECONDS = 'milliseconds',
}
export interface IDateAdd {
  add(date: Date, amount: number, unit?: DateUnits): Date;
}

export interface IDateStartOfDay {
  startOfDay(date: Date): Date;
}

export interface IDateEndOfDay {
  endOfDay(date: Date): Date;
}

export interface IDateGreaterThanService {
  dateGreaterThan(date: Date, than: Date): boolean;
}
