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

            await rewardService.generateReward(userId, time)

            res.status(200)
        })
        this.app.patch('/users/:userId/rewards/:availableAt/redeem', (req, res)=> {

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