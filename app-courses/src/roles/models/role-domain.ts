export class Role {
    private readonly roleId: number
    private name: string

    constructor(name: string) {
        if (name.length < 3) throw new Error('Role name must be at least 3 characters long')

        this.roleId = Math.floor(Math.random() * 1000)
        this.name = name
    }

    properties() {
        return {
            roleId: this.roleId,
            name: this.name
        }
    }
}