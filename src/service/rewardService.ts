import dateHelper from "../helper/dateHelper";
import {Reward} from "../Klass/Reward";
import {User} from "../Klass/User";
import dbService from "./dbService";
import _ from "lodash";

export class RewardService {
    generateRewards = async (userId: string, atDate: Date)=> {
        const week = dateHelper.toCurrentWeek(atDate)
        const weekDays: Date[] = []
        const rewards: Reward[] = []

        for(let timeStamp = week[0].getTime(); timeStamp <= week[1].getTime(); timeStamp += 24*60*60*1000) {
            weekDays.push(new Date(timeStamp))
        }

        for(let weekDay of weekDays) {
            rewards.push(new Reward({
                availableAt: weekDay,
                redeemedAt: null,
                expiresAt: new Date(weekDay.getTime() + 24*60*60*1000),
            }))
        }

        const user = new User({
            id: userId,
            rewards: await dbService.get(userId) ?? [],
        })

        user.addRewards(rewards)

        await dbService.set(user.id, user.rewards)
    }

    getRewards = async (userId: string): Promise<Reward[]> => {
        const data = await dbService.get(userId) ?? []
        const rewards: Reward[] = _.map(data, (r)=> (new Reward(r)))

        return rewards
    }

    getReward = async (userId: string, rewardDate: Date): Promise<Reward> => {
        const rewards = await this.getRewards(userId)
        const res = _.find(rewards, (r)=> {
            return r.availableAt.getTime() === rewardDate.getTime()
        })

        return res ?? null
    }

    redeemReward = async (userId: string, rewardDate: Date)=> {
        const user = new User({
            id: userId,
            rewards: await dbService.get(userId) ?? [],
        })

        user.redeemReward(rewardDate)

        await dbService.set(user.id, user.rewards)
    }
}

export default new RewardService()