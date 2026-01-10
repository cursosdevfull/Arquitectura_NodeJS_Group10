import { ApiProperty } from "@nestjs/swagger";

export class ResponseInternalServerError {
    @ApiProperty({
        type: "number",
        description: "The HTTP status code",
        example: 500,
        required: true
    })
    statusCode: number;

    @ApiProperty({
        type: "string",
        description: "The error message",
        example: "Internal server error",
        required: true
    })
    message: string;
    @ApiProperty({
        type: "string",
        description: "The timestamp of the error",
        example: "2024-01-01T00:00:00.000Z",
        required: true
    })
    timestamp: string;

    @ApiProperty({
        type: "string",
        description: "The path where the error occurred",
        example: "error",
        required: false
    })
    stack: string;
}