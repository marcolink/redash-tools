import dayjs from "dayjs";
import {Redash} from "./types";

export type DateRange = { start: string, end: string }

export function parseDynamicDate(value: Redash.DynamicDate | string | string[], format: string): string | string[] {
    if (Array.isArray(value)) {
        return value;
    }

    let today = dayjs();

    switch (value) {
        case 'd_yesterday':
            today = today.subtract(1, "day");
            break;
        case 'd_week':
            today = today.subtract(1, "week");
            break;
        case 'd_month':
            today = today.subtract(1, "month");
            break;
        default:
            return value;
    }
    return today.startOf('day').format(format)
}

export function parseDynamicDateRange(value: Redash.DynamicDate | DateRange | string, format: string): DateRange {
    let start = dayjs();
    let end = dayjs();

    switch (value) {
        case 'd_last_7_days':
            start = start.subtract(7, 'days')
            break;
        case 'd_last_14_days':
            start = start.subtract(14, 'days')
            break;
        case 'd_last_30_days':
            start = start.subtract(30, 'days')
            break;
        case 'd_last_60_days':
            start = start.subtract(60, 'days')
            break;
        case 'd_last_90_days':
            start = start.subtract(90, 'days')
            break;
        case 'd_last_week':
            start = start.subtract(1, 'week').startOf("week")
            end = end.subtract(1, 'week').endOf("week")
            break;
        case 'd_last_month':
            start = start.subtract(1, 'month').startOf("month")
            end = end.subtract(1, 'month').endOf("month")
            break;

        case 'd_last_year':
            start = start.subtract(1, 'year').startOf("year")
            end = end.subtract(1, 'year').endOf("year")
            break;
        case 'd_this_week':
            start = start.startOf("week")
            break;
        case 'd_this_month':
            start = start.startOf("month")
            break;
        case 'd_this_year':
            start = start.startOf("year")
            break;
        default:
            return value as DateRange
    }

    return {
        start: start.startOf('day').format(format),
        end: end.format(format)
    }
}
