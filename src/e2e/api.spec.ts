import appService from "../service/appService";
import fetch from 'node-fetch'

describe('api e2e', ()=> {
    const host = `http://localhost:${appService.PORT}`

    beforeAll(async ()=> {
        appService.init()
        await appService.start()
    })

    afterAll(async ()=> {
        await appService.stop()
    })

    test('/ping', async ()=> {
        const fetched = await fetch(`${host}/ping`)
        const text = await fetched.text()

        expect(fetched.status).toEqual(200)
        expect(text).toEqual('pong')
    })
})