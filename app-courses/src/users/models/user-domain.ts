import { Role } from "../entities/role"

export class User {
    private readonly userId: number
    private name: string
    private email: string
    private roles: Role[]
    private active: boolean

    constructor(name: string, email: string, roles: Role[]) {
        if (name.length < 3) throw new Error('User name must be at least 3 characters long')
        if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)) throw new Error('Invalid email address')
        if (!Array.isArray(roles) || roles.length === 0) throw new Error('User must have at least one role')

        this.userId = Math.floor(Math.random() * 1000)
        this.name = name
        this.email = email
        this.roles = roles
        this.active = true
    }

    properties() {
        return {
            userId: this.userId,
            name: this.name,
            email: this.email,
            roles: this.roles,
            active: this.active
        }
    }
}