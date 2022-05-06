
/*
A simple key-val in-men db. Use async methods to mock real db.
 */
export class DbService {

    private storage = {}

    set = async (key: string, value: any)=> {
        this.storage[key] = value
    }

    get = async (key: string)=> {
        return this.storage[key] ?? null
    }

    reset = async ()=> {
        this.storage = {}
    }
}

export default new DbService()