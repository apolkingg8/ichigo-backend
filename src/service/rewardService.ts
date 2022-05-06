import dateHelper from "../helper/dateHelper";
import {Reward} from "../Klass/Reward";

export class RewardService {
    generateReward = async (userId: string, atDate: Date)=> {
        const week = dateHelper.toCurrentWeek(atDate)
        const weekDays = []

        for(let timeStamp = week[0].getTime(); timeStamp <= week[1].getTime(); timeStamp += 24*60*60*1000) {
            weekDays.push(new Date(timeStamp).toISOString())
        }


    }

    getRewardsByUserId = async (userId: string): Promise<Reward[]> => {
        return []
    }
}

export default new RewardService()