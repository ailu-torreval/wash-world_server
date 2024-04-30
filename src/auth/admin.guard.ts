import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Client } from "src/client/entities/client.entity";
import { Role } from "src/client/entities/role";


@Injectable()
export class AdminGuard implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const client: Client = request.user

        return client && client.role === Role.Admin
    }
    
}