import { RoleData } from "../../../roles/models";
import { User, UserData } from "../../models";

export class UserDto {
    static fromDataToDomain(data: UserData | UserData[]): User | User[] {
        if (Array.isArray(data)) {
            return data.map(item => this.fromDataToDomain(item) as User);
        }

        return new User({
            id: data.id,
            name: data.name,
            email: data.email,
            roles: data.roles ? data.roles : []
        });
    }

    static fromDomainToData(domain: User | User[]): UserData | UserData[] {
        if (Array.isArray(domain)) {
            return domain.map(item => this.fromDomainToData(item) as UserData);
        }

        const data = new UserData();
        data.id = domain.properties().id;
        data.name = domain.properties().name;
        data.email = domain.properties().email;
        data.roles = domain.properties().roles as RoleData[];
        data.deletedAt = domain.properties().deletedAt;
        return data;
    }
}