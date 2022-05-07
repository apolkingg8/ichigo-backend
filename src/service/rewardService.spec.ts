import rewardService, {RewardService} from "./rewardService";
import dbService from "./dbService";
import {Reward} from "../Klass/Reward";

describe('rewardService', ()=> {
    beforeEach(async ()=> {
        await dbService.reset()
    })

    test('constructor()', ()=> {
        expect(rewardService).toBeInstanceOf(RewardService)
    })

    test('generateReward()', async ()=> {
        await rewardService.generateRewards('1', new Date('2020-03-19T12:00:00Z'))

        const res = await dbService.get('1')

        expect(res.length).toEqual(7)
        expect(res[0]).toMatchObject({availableAt: new Date('2020-03-15T00:00:00Z'), redeemedAt: null, expiresAt: new Date('2020-03-16T00:00:00Z')})
        expect(res[1]).toMatchObject({availableAt: new Date('2020-03-16T00:00:00Z'), redeemedAt: null, expiresAt: new Date('2020-03-17T00:00:00Z')})
        expect(res[2]).toMatchObject({availableAt: new Date('2020-03-17T00:00:00Z'), redeemedAt: null, expiresAt: new Date('2020-03-18T00:00:00Z')})
        expect(res[3]).toMatchObject({availableAt: new Date('2020-03-18T00:00:00Z'), redeemedAt: null, expiresAt: new Date('2020-03-19T00:00:00Z')})
        expect(res[4]).toMatchObject({availableAt: new Date('2020-03-19T00:00:00Z'), redeemedAt: null, expiresAt: new Date('2020-03-20T00:00:00Z')})
        expect(res[5]).toMatchObject({availableAt: new Date('2020-03-20T00:00:00Z'), redeemedAt: null, expiresAt: new Date('2020-03-21T00:00:00Z')})
        expect(res[6]).toMatchObject({availableAt: new Date('2020-03-21T00:00:00Z'), redeemedAt: null, expiresAt: new Date('2020-03-22T00:00:00Z')})
    })

    test('generateReward() with exist rewards', async ()=> {
        const redeemedAt = new Date()
        await dbService.set('1', [
            new Reward({availableAt: new Date('2020-03-14T00:00:00Z'), redeemedAt: null, expiresAt: new Date('2020-03-15T00:00:00Z')}),
            new Reward({availableAt: new Date('2020-03-16T00:00:00Z'), redeemedAt: redeemedAt, expiresAt: new Date('2020-03-17T00:00:00Z')}),
        ])

        await rewardService.generateRewards('1', new Date('2020-03-19T12:00:00Z'))

        const res = await dbService.get('1')

        expect(res.length).toEqual(8)
        expect(res[0]).toMatchObject({availableAt: new Date('2020-03-14T00:00:00Z'), redeemedAt: null, expiresAt: new Date('2020-03-15T00:00:00Z')})
        expect(res[1]).toMatchObject({availableAt: new Date('2020-03-15T00:00:00Z'), redeemedAt: null, expiresAt: new Date('2020-03-16T00:00:00Z')})
        expect(res[2]).toMatchObject({availableAt: new Date('2020-03-16T00:00:00Z'), redeemedAt: redeemedAt, expiresAt: new Date('2020-03-17T00:00:00Z')})
        expect(res[3]).toMatchObject({availableAt: new Date('2020-03-17T00:00:00Z'), redeemedAt: null, expiresAt: new Date('2020-03-18T00:00:00Z')})
        expect(res[4]).toMatchObject({availableAt: new Date('2020-03-18T00:00:00Z'), redeemedAt: null, expiresAt: new Date('2020-03-19T00:00:00Z')})
        expect(res[5]).toMatchObject({availableAt: new Date('2020-03-19T00:00:00Z'), redeemedAt: null, expiresAt: new Date('2020-03-20T00:00:00Z')})
        expect(res[6]).toMatchObject({availableAt: new Date('2020-03-20T00:00:00Z'), redeemedAt: null, expiresAt: new Date('2020-03-21T00:00:00Z')})
        expect(res[7]).toMatchObject({availableAt: new Date('2020-03-21T00:00:00Z'), redeemedAt: null, expiresAt: new Date('2020-03-22T00:00:00Z')})
    })

    test('getRewards()', async ()=> {
        const rewards = [
            new Reward({availableAt: new Date('2020-03-14T00:00:00Z'), redeemedAt: null, expiresAt: new Date('2020-03-15T00:00:00Z')}),
            new Reward({availableAt: new Date('2020-03-16T00:00:00Z'), redeemedAt: new Date(), expiresAt: new Date('2020-03-17T00:00:00Z')}),
        ]
        await dbService.set('1', rewards)

        const res = await rewardService.getRewards('1')

        expect(res).toMatchObject(rewards)
    })

    test('getReward()', async ()=> {
        const rewards = [
            new Reward({availableAt: new Date('2020-03-14T00:00:00Z'), redeemedAt: null, expiresAt: new Date('2020-03-15T00:00:00Z')}),
            new Reward({availableAt: new Date('2020-03-16T00:00:00Z'), redeemedAt: new Date(), expiresAt: new Date('2020-03-17T00:00:00Z')}),
        ]
        await dbService.set('1', rewards)

        const res = await rewardService.getReward('1', new Date('2020-03-14T00:00:00Z'))

        expect(res).toMatchObject(rewards[0])
    })

    test('redeemReward()', async ()=> {
        const rewards = [
            new Reward({availableAt: new Date('2020-03-14T00:00:00Z'), redeemedAt: null, expiresAt: new Date('2099-03-15T00:00:00Z')}),
            new Reward({availableAt: new Date('2020-03-16T00:00:00Z'), redeemedAt: null, expiresAt: new Date('2099-03-17T00:00:00Z')}),
        ]
        await dbService.set('1', rewards)

        await rewardService.redeemReward('1', new Date('2020-03-14T00:00:00Z'))
        const res = await dbService.get('1')

        expect(res[0]['redeemedAt']).not.toBeNull()
    })
})