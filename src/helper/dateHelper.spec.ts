import dateHelper, {DateHelper} from "./dateHelper";

describe('dateHelper', ()=> {
    test('constructor()', ()=> {
        expect(dateHelper).toBeInstanceOf(DateHelper)
    })

    test('toCurrentWeek()', ()=> {
        const currDate = new Date('2020-03-19T12:00:00Z')
        const res = dateHelper.toCurrentWeek(currDate)

        expect(res[0]).toEqual(new Date('2020-03-15T00:00:00Z'))
        expect(res[1]).toEqual(new Date('2020-03-21T00:00:00Z'))
    })
})