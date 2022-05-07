import {Reward} from "./Reward";
import _ from "lodash";

export class User {
    id: string = ''
    rewards: Reward[]

    addRewards = (newRewards: Reward[])=> {
        this.rewards = _(this.rewards).unionBy(newRewards, (r)=> {
            return r.availableAt.getTime()
        }).sortBy((r)=> {
            return r.availableAt.getTime()
        }).value()
    }

    redeemReward = (rewardDate: Date)=> {
        this.rewards = _(this.rewards).map((r)=> {
            if(r.availableAt.getTime() === rewardDate.getTime()
            && Date.now() <= r.expiresAt.getTime()) {
                r.redeemedAt = new Date()
            }

            return r
        }).value()
    }

    constructor(props: Partial<User>) {
        Object.assign(this, props)
    }
}