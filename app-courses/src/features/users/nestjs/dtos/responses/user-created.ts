import { ApiProperty } from "@nestjs/swagger";

class DataResponse {
    @ApiProperty({
        type: "string",
        description: "The message confirming user creation",
        example: "User created",
        required: true
    })
    message: string;
}

export class UserCreated {
    @ApiProperty({
        type: "number",
        description: "The status code of the response",
        example: 200,
        required: true
    })
    status: number;


    @ApiProperty({
        type: DataResponse,
        description: "The data of the created user",
        required: true
    })
    data: DataResponse
}