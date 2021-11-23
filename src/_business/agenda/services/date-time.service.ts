export enum DateUnit {
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
  add(date: Date, amount: number, unit?: DateUnit): Date;
}

export interface IDateStartOf {
  startOf(date: Date, unit?: DateUnit): Date;
}

export interface IDateEndOf {
  endOf(date: Date, unit?: DateUnit): Date;
}

export interface IDateGreaterThan {
  greaterThan(date: Date, than: Date): boolean;
}
