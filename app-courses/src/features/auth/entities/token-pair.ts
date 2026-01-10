export class TokenPair {
    constructor(
        public readonly accessToken: string,
        public readonly refreshToken: string,
    ) { }

    static create(accessToken: string, refreshToken: string): TokenPair {
        if (!accessToken || !refreshToken) {
            throw new Error('Access token and refresh token are required');
        }

        return new TokenPair(accessToken, refreshToken);
    }
}