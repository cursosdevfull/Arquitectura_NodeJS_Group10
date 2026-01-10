import { PortBase } from '../../../core/generics';
import { StudentData } from '../models';

export interface StudentPort extends PortBase<StudentData> {
    findByEmail(email: string): Promise<StudentData | null>;
}
