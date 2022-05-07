import express, {Express} from "express";
import http from "http";
import rewardService from "./rewardService";

export class AppService {
    readonly PORT = 8088

    app: Express = null
    server: http.Server = null

    init = ()=> {
        this.app = express()
        this.app.get('/ping', (req, res)=> {
            res.status(200).send('pong')
        })
        this.app.get('/users/:userId/rewards', async (req, res)=> {
            const userId = req.params['userId']
            const time = new Date(req.query['at'] as string)

            // todo: check param & query is valid

            await rewardService.generateRewards(userId, time)
            const data = await rewardService.getRewards(userId)

            res.status(200).json({
                data: data,
            })
        })
        this.app.patch('/users/:userId/rewards/:rewardDate/redeem', async (req, res)=> {
            const userId = req.params['userId']
            const rewardDate = new Date(req.params['rewardDate'])
            let reward = await rewardService.getReward(userId, rewardDate)

            // todo: check param & query is valid

            if(!reward) {
                res.status(404).json({
                    error: {
                        message: 'Reward not found.',
                    }
                })
                return
            }

            if(Date.now() > reward.expiresAt.getTime()) {
                res.status(410).json({
                    error: {
                        message: 'This reward is already expired.',
                    }
                })
                return
            }

            // I'm not sure need this feature or not.
            /*
            if(reward.redeemedAt !== null) {
                res.status(410).json({
                    error: {
                        message: 'This reward is already redeemed.',
                    }
                })
                return
            }
            */

            await rewardService.redeemReward(userId, rewardDate)
            reward = await rewardService.getReward(userId, rewardDate)

            res.status(200).json({
                data: reward,
            })
        })
    }

    start = async ()=> {
        await new Promise<void>((resolve)=> {
            this.server = this.app.listen(this.PORT, ()=> {
                console.log(`App is listening :${this.PORT}`)
                resolve()
            })
        })
    }

    stop = async ()=> {
        this.server.close()
        this.app = null
        this.server = null
        console.log(`App on :${this.PORT} stopped`)
    }
}

export default new AppService()