import {Redash} from "redash-js-client";
import {parseOptionParameters} from "../src/utils";
import OptionParameters = Redash.OptionParameters;
import MockDate from 'mockdate'

const createParameter = (subParameters: Pick<OptionParameters, 'name' | 'value' | 'type'>): OptionParameters => {
    return {
        locals: [],
        global: false,
        parentQueryId: 0,
        queryId: 1,
        title: 'Text Type',
        ...subParameters
    }
}

describe('a parseOptionParameters function', () => {
    beforeEach(() => {
        MockDate.set(new Date('1980-02-02T10:32:30Z'))
    })

    afterEach(() => {
        MockDate.reset()
    })

    it('can parse options with a "text" type parameter', () => {
        const parameter: OptionParameters = createParameter({
            name: 'textType',
            value: 'hello world',
            type: "text",
        })
        expect(parseOptionParameters([parameter]))
            .toEqual({textType: 'hello world'})
    })

    it('can parse options with a "enum" type parameter', () => {
        const parameter: OptionParameters = createParameter({
            name: 'enumType',
            value: ['value1', 'value2'],
            type: "enum",
        })
        expect(parseOptionParameters([parameter]))
            .toEqual({enumType: ['value1', 'value2']})
    })

    describe('can parse options with a "date" type parameter', () => {

        it('and returns yesterday\'s date', () => {
            const parameter: OptionParameters = createParameter({
                name: 'dateType',
                value: 'd_yesterday',
                type: "date",
            })
            expect(parseOptionParameters([parameter]))
                .toEqual({dateType: "1980-02-01"})
        })

        it('and returns a week old date', () => {
            const parameter: OptionParameters = createParameter({
                name: 'dateType',
                value: 'd_week',
                type: "date",
            })
            expect(parseOptionParameters([parameter]))
                .toEqual({dateType: "1980-01-26"})
        })

        it('and returns a month old date', () => {
            const parameter: OptionParameters = createParameter({
                name: 'dateType',
                value: 'd_month',
                type: "date",
            })
            expect(parseOptionParameters([parameter]))
                .toEqual({dateType: "1980-01-02"})
        })

    })

    describe('can parse options with a "datetime-local" type parameter', () => {

        it('and returns yesterday\'s datetime', () => {
            const parameter: OptionParameters = createParameter({
                name: 'dateType',
                value: 'd_yesterday',
                type: "datetime-local",
            })
            expect(parseOptionParameters([parameter]))
                .toEqual({dateType: "1980-02-01 00:00"})
        })

        it('and returns a week old date', () => {
            const parameter: OptionParameters = createParameter({
                name: 'dateType',
                value: 'd_week',
                type: "datetime-local",
            })
            expect(parseOptionParameters([parameter]))
                .toEqual({dateType: "1980-01-26 00:00"})
        })

        it('and returns a month old date', () => {
            const parameter: OptionParameters = createParameter({
                name: 'dateType',
                value: 'd_month',
                type: "datetime-local",
            })
            expect(parseOptionParameters([parameter]))
                .toEqual({dateType: "1980-01-02 00:00"})
        })

    })

    describe('can parse options with a "date-range" type parameter', () => {
        it('and return "this week" date range', () => {
            const parameter: OptionParameters = createParameter({
                name: 'dateRangeType',
                value: 'd_this_week',
                type: "date-range",
            })
            expect(parseOptionParameters([parameter]))
                .toEqual({dateRangeType: {start: "1980-01-27", end: "1980-02-02"}})
        })
        it('and return "this month" date range', () => {
            const parameter: OptionParameters = createParameter({
                name: 'dateRangeType',
                value: 'd_this_month',
                type: "date-range",
            })
            expect(parseOptionParameters([parameter]))
                .toEqual({dateRangeType: {start: "1980-02-01", end: "1980-02-02"}})
        })
        it('and return "this year" date range', () => {
            const parameter: OptionParameters = createParameter({
                name: 'dateRangeType',
                value: 'd_this_year',
                type: "date-range",
            })
            expect(parseOptionParameters([parameter]))
                .toEqual({dateRangeType: {start: "1980-01-01", end: "1980-02-02"}})
        })

        it('and return a last 7 days date range', () => {
            const parameter: OptionParameters = createParameter({
                name: 'dateRangeType',
                value: 'd_last_7_days',
                type: "date-range",
            })
            expect(parseOptionParameters([parameter]))
                .toEqual({dateRangeType: {start: "1980-01-26", end: "1980-02-02"}})
        })

        it('and return "last month" date range', () => {
            const parameter: OptionParameters = createParameter({
                name: 'dateRangeType',
                value: 'd_last_month',
                type: "date-range",
            })
            expect(parseOptionParameters([parameter]))
                .toEqual({dateRangeType: {start: "1980-01-01", end: "1980-01-31"}})
        })

        it('and return "last year" date range', () => {
            const parameter: OptionParameters = createParameter({
                name: 'dateRangeType',
                value: 'd_last_year',
                type: "date-range",
            })
            expect(parseOptionParameters([parameter]))
                .toEqual({dateRangeType: {start: "1979-01-01", end: "1979-12-31"}})
        })
    })
})
