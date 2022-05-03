import express, {Express} from "express";
import http from "http";

export class AppService {
    readonly PORT = 8088

    app: Express = null
    server: http.Server = null

    init = ()=> {
        this.app = express()
        this.app.get('ping', (req, res)=> {
            res.status(200).send('pong')
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