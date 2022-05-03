import appService, {AppService} from "./appService";
import tcpPortUsed from 'tcp-port-used'

describe('appService', ()=> {
    test('constructor()', ()=> {
        expect(appService).toBeInstanceOf(AppService)
    })

    test('init()', ()=> {
        appService.init()

        expect(appService.app).not.toEqual(null)
    })

    test('start() & stop()', async ()=> {
        let isPortUsed = await tcpPortUsed.check(appService.PORT)
        expect(isPortUsed).toEqual(false)

        appService.init()
        await appService.start()

        expect(appService.app).not.toEqual(null)
        expect(appService.server).not.toEqual(null)
        isPortUsed = await tcpPortUsed.check(appService.PORT)
        expect(isPortUsed).toEqual(true)

        await appService.stop()

        isPortUsed = await tcpPortUsed.check(appService.PORT)
        expect(appService.app).toEqual(null)
        expect(appService.server).toEqual(null)
        expect(isPortUsed).toEqual(false)
    })
})