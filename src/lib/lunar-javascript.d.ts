declare module 'lunar-javascript' {
  export class Lunar {
    static fromDate(date: Date): Lunar;
    static fromYmd(year: number, month: number, day: number): Lunar;
    getYear(): number;
    getMonth(): number;
    getDayInGanZhi(): string;
    getMonthInGanZhi(): string;
    getYearInGanZhi(): string;
    getTimeInGanZhi(): string;
    getTimeZhi(): string;
    getDayZhi(): string;
    getMonthZhi(): string;
    getYearZhi(): string;
    getTimeXun(): string;
    getDayXun(): string;
    getMonthXun(): string;
    getYearXun(): string;
    getPrevJieQi(wholeDay: boolean): JieQi;
    getJieQiList(): JieQi[];
    toString(): string;
  }

  export class Solar {
    static fromDate(date: Date): Solar;
    static fromYmd(year: number, month: number, day: number): Solar;
    getYear(): number;
    toFullString(): string;
    toDate(): Date;
  }

  export class JieQi {
    getName(): string;
  }
}
