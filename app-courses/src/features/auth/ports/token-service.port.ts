export interface TokenService {
    generateAccessToken(userId: number, email: string, roles: string[]): Promise<string>;
    generateRefreshToken(userId: number): Promise<string>;
    verifyAccessToken(token: string): Promise<{ userId: number; email: string; roles: string[] }>;
    verifyRefreshToken(token: string): Promise<{ userId: number }>;
}