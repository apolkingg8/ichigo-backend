import rewardService, {RewardService} from "./rewardService";
import dbService from "./dbService";

describe('rewardService', ()=> {
    beforeEach(async ()=> {
        await dbService.reset()
    })

    test('constructor()', ()=> {
        expect(rewardService).toBeInstanceOf(RewardService)
    })

    test('generateReward()', async ()=> {
        await rewardService.generateReward('1', new Date('2020-03-19T12:00:00Z'))
    })
})