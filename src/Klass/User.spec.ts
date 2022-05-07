import {Reward} from "./Reward";
import {User} from "./User";

describe('User', ()=> {
    test('constructor()', ()=> {
        const props: Partial<User> = {
            id: '1',
            rewards: [new Reward({
                availableAt: new Date(),
                redeemedAt: new Date(),
                expiresAt: new Date(),
            })],
        }
        const user = new User(props)

        expect(user).toBeInstanceOf(User)
        expect(user).toMatchObject(props)
    })

    test('addRewards()', ()=> {
        const rewards = [
            new Reward({
                availableAt: new Date('2011-11-1'),
                redeemedAt: new Date(),
                expiresAt: new Date(),
            }),
            new Reward({
                availableAt: new Date('2011-11-2'),
                redeemedAt: new Date(),
                expiresAt: new Date(),
            }),
        ]
        const user = new User({
            id: '1',
            rewards: rewards,
        })
        const newRewards = [
            new Reward({
                availableAt: new Date('2011-11-2'),
                redeemedAt: new Date('2011-12-2'),
                expiresAt: new Date(),
            }),
            new Reward({
                availableAt: new Date('2011-11-3'),
                redeemedAt: new Date(),
                expiresAt: new Date(),
            }),
        ]

        user.addRewards(newRewards)

        expect(user.rewards.length).toEqual(3)
        expect(user.rewards[0]).toEqual(rewards[0])
        expect(user.rewards[1]).toEqual(rewards[1])
        expect(user.rewards[2]).toEqual(newRewards[1])
    })

    test('redeemReward()', ()=> {
        const rewards = [
            new Reward({
                availableAt: new Date('2011-11-1'),
                redeemedAt: null,
                expiresAt: new Date('2099-11-1'),
            }),
            new Reward({
                availableAt: new Date('2011-11-2'),
                redeemedAt: null,
                expiresAt: new Date('2011-11-3'),
            }),
        ]
        const user = new User({
            id: '1',
            rewards: rewards,
        })

        user.redeemReward(new Date('2011-11-1'))
        user.redeemReward(new Date('2011-11-2'))

        expect(user.rewards[0].redeemedAt).not.toBeNull()
        expect(user.rewards[1].redeemedAt).toBeNull()
    })
})