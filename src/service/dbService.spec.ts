import dbService, {DbService} from "./dbService";

describe('dbService', ()=> {

    beforeEach(async ()=> {
        await dbService.reset()
    })

    test('constructor()', ()=> {
        expect(dbService).toBeInstanceOf(DbService)
    })

    test('set() & get()', async ()=> {
        await dbService.set('foo1', 'bar1')
        await dbService.set('foo2', 'bar2')

        const res1 = await dbService.get('foo1')
        const res2 = await dbService.get('foo2')
        const res3 = await dbService.get('foo3')

        expect(res1).toEqual('bar1')
        expect(res2).toEqual('bar2')
        expect(res3).toEqual(null)
    })

    test('reset()', async ()=> {
        await dbService.set('foo1', 'bar1')

        const res1 = await dbService.get('foo1')
        expect(res1).toEqual('bar1')

        await dbService.reset()

        const res2 = await dbService.get('foo1')
        expect(res2).toEqual(null)
    })
})