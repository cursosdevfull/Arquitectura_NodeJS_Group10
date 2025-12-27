import { Role, RoleData } from "../../models";

export class RoleDto {
    static fromDataToDomain(data: RoleData | RoleData[]): Role | Role[] {
        if (Array.isArray(data)) {
            return data.map(item => this.fromDataToDomain(item) as Role);
        }

        return new Role({
            id: data.id,
            name: data.name
        });
    }

    static fromDomainToData(domain: Role | Role[]): RoleData | RoleData[] {
        if (Array.isArray(domain)) {
            return domain.map(item => this.fromDomainToData(item) as RoleData);
        }

        const data = new RoleData();
        data.id = domain.properties().id;
        data.name = domain.properties().name;
        data.deletedAt = domain.properties().deletedAt;
        return data;
    }
}