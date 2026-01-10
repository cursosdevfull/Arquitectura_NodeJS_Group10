import { Delete, Get, HttpCode, Post, Put, UseGuards } from "@nestjs/common"
import { Permissions } from "./permissions"
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger"

type ResponseDefinition = {
    status: number,
    description: string,
    type: any,
    isArray: boolean
}

type HttpMethod =
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"

type EndpointParams = {
    method: HttpMethod,
    summary?: string,
    route?: string,
    statusCode?: number
    permissions?: string[]
    guards?: any[]
    responses?: ResponseDefinition[]
}

export function Endpoint(params: EndpointParams): MethodDecorator {
    const methodMap: Record<HttpMethod, any> = {
        GET: Get,
        POST: Post,
        PUT: Put,
        DELETE: Delete
    }

    return (target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
        const methodDecorator = methodMap[params.method]

        if (!methodDecorator) {
            throw new Error(`Unsupported HTTP method: ${params.method}`)
        }

        methodDecorator(params.route ?? '')(target, key, descriptor)

        if (params.statusCode) {
            HttpCode(params.statusCode)(target, key, descriptor)
        }

        if (params.permissions && params.permissions.length > 0) {
            Permissions(...params.permissions)(target, key, descriptor)
        }

        if (params.guards && params.guards.length > 0) {
            UseGuards(...params.guards)(target, key, descriptor)
            ApiBearerAuth()(target, key, descriptor)
        }

        if (params.responses && params.responses.length > 0) {
            for (const response of params.responses) {
                ApiResponse({
                    status: response.status,
                    description: response.description,
                    type: response.type,
                    isArray: response.isArray
                })(target, key, descriptor)
            }
        }

        if (params.summary) {
            ApiOperation({ summary: params.summary })(target, key, descriptor)
        }

        return descriptor;
    }
}