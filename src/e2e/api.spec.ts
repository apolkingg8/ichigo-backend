import appService from "../service/appService";
import fetch from 'node-fetch'
import dbService from "../service/dbService";

describe('api e2e', ()=> {
    const host = `http://localhost:${appService.PORT}`

    beforeAll(async ()=> {
        appService.init()
        await appService.start()
    })

    beforeEach(async ()=> {
        await dbService.reset()
    })

    afterAll(async ()=> {
        await appService.stop()
    })

    test('GET /ping', async ()=> {
        const fetched = await fetch(`${host}/ping`)
        const text = await fetched.text()

        expect(fetched.status).toEqual(200)
        expect(text).toEqual('pong')
    })

    test('GET /users/:userId/rewards', async ()=> {
        const fetched = await fetch(`${host}/users/1/rewards?at=2020-03-19T12:00:00Z`)
        const data = await fetched.json()

        expect(fetched.status).toEqual(200)
        expect(data).toEqual({
            "data": [
                { "availableAt": "2020-03-15T00:00:00.000Z", "redeemedAt": null, "expiresAt": "2020-03-16T00:00:00.000Z" },
                { "availableAt": "2020-03-16T00:00:00.000Z", "redeemedAt": null, "expiresAt": "2020-03-17T00:00:00.000Z" },
                { "availableAt": "2020-03-17T00:00:00.000Z", "redeemedAt": null, "expiresAt": "2020-03-18T00:00:00.000Z" },
                { "availableAt": "2020-03-18T00:00:00.000Z", "redeemedAt": null, "expiresAt": "2020-03-19T00:00:00.000Z" },
                { "availableAt": "2020-03-19T00:00:00.000Z", "redeemedAt": null, "expiresAt": "2020-03-20T00:00:00.000Z" },
                { "availableAt": "2020-03-20T00:00:00.000Z", "redeemedAt": null, "expiresAt": "2020-03-21T00:00:00.000Z" },
                { "availableAt": "2020-03-21T00:00:00.000Z", "redeemedAt": null, "expiresAt": "2020-03-22T00:00:00.000Z" }
            ]
        })
    })

    test('PATCH /users/:userId/rewards/:rewardDate/redeem', async ()=> {
        await fetch(`${host}/users/1/rewards?at=2099-05-10T12:00:00Z`)
        const fetched = await fetch(`${host}/users/1/rewards/2099-05-10T00:00:00Z/redeem`, {
            method: 'patch',
        })
        const data = await fetched.json()

        expect(fetched.status).toEqual(200)
        expect(data['data']['redeemedAt']).not.toBeNull()
    })

    test('PATCH /users/:userId/rewards/:rewardDate/redeem reward not exist', async ()=> {
        await fetch(`${host}/users/1/rewards?at=2099-05-10T12:00:00Z`)
        const fetched = await fetch(`${host}/users/1/rewards/2099-07-10T00:00:00Z/redeem`, {
            method: 'patch',
        })

        expect(fetched.status).toEqual(404)
    })

    test('PATCH /users/:userId/rewards/:rewardDate/redeem expired reward', async ()=> {
        await fetch(`${host}/users/1/rewards?at=2011-05-10T12:00:00Z`)
        const fetched = await fetch(`${host}/users/1/rewards/2011-05-10T00:00:00Z/redeem`, {
            method: 'patch',
        })

        expect(fetched.status).toEqual(410)
    })
})