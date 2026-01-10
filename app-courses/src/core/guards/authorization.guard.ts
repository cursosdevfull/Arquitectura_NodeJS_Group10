import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const userPermissions = request.user.roles

        const requiredPermissions = this.reflector.getAllAndOverride<string[]>("permissions", [context.getHandler(), context.getClass()]) || [];

        if (!requiredPermissions || requiredPermissions.length === 0) {
            return true;
        }

        return requiredPermissions.some(permission => userPermissions.includes(permission));
    }
}