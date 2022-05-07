
export class Reward {
    availableAt: Date
    redeemedAt: Date
    expiresAt: Date

    constructor(props: Partial<Reward>) {
        Object.assign(this, props)
    }
}