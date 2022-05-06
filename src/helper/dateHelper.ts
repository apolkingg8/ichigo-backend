
export class DateHelper {
    toCurrentWeek = (currDate: Date): [Date, Date]=> {
        const first = currDate.getDate() - currDate.getDay()
        const last = first + 6
        const firstDay = new Date(currDate.setDate(first))
        const lastDay = new Date(currDate.setDate(last))

        return [
            new Date(`${firstDay.getFullYear()}-${firstDay.getMonth() + 1}-${firstDay.getDate()} 00:00:00.000+00:00`),
            new Date(`${lastDay.getFullYear()}-${lastDay.getMonth() + 1}-${lastDay.getDate()} 00:00:00.000+00:00`),
        ]
    }
}

export default new DateHelper()