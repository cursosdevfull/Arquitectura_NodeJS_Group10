import * as bcrypt from 'bcryptjs';

export class HashService {
    private static readonly SALT_ROUNDS = 12;

    /**
     * Cifra un password usando bcrypt
     * @param password - El password en texto plano
     * @returns Promise del password hasheado
     */
    static async hashPassword(password: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
            return await bcrypt.hash(password, salt);
        } catch (error) {
            throw new Error(`Error al hashear password: ${error.message}`);
        }
    }

    /**
     * Verifica si un password coincide con el hash almacenado
     * @param password - El password en texto plano
     * @param hashedPassword - El hash almacenado
     * @returns Promise<boolean> - true si coinciden, false si no
     */
    static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(password, hashedPassword);
        } catch (error) {
            throw new Error(`Error al verificar password: ${error.message}`);
        }
    }

    /**
     * Genera un hash síncrono (para casos donde no se puede usar async)
     * Solo usar en casos específicos, preferir el método async
     * @param password - El password en texto plano
     * @returns string - El password hasheado
     */
    static hashPasswordSync(password: string): string {
        try {
            const salt = bcrypt.genSaltSync(this.SALT_ROUNDS);
            return bcrypt.hashSync(password, salt);
        } catch (error) {
            throw new Error(`Error al hashear password síncronamente: ${error.message}`);
        }
    }

    /**
     * Verifica un password de forma síncrona
     * @param password - El password en texto plano
     * @param hashedPassword - El hash almacenado
     * @returns boolean - true si coinciden, false si no
     */
    static verifyPasswordSync(password: string, hashedPassword: string): boolean {
        try {
            return bcrypt.compareSync(password, hashedPassword);
        } catch (error) {
            throw new Error(`Error al verificar password síncronamente: ${error.message}`);
        }
    }
}