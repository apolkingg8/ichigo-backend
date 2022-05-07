import {Reward} from "./Reward";

describe('Reward', ()=> {
    test('constructor()', ()=> {
        const props: Partial<Reward> = {
            availableAt: new Date(),
            redeemedAt: new Date(),
            expiresAt: new Date(),
        }
        const reward = new Reward(props)

        expect(reward).toBeInstanceOf(Reward)
        expect(reward).toMatchObject(props)
    })
})