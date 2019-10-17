let lastIndex = 1

export class Log {

    constructor(type) {
        this.type = type
        this.when = new Date()
        this.id = lastIndex++
    }

    static getLastIndex() {
        return lastIndex
    }
}