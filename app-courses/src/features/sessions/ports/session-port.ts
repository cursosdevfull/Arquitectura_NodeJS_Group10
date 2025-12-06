import { Session } from '../models';

export interface SessionPort {
  save(session: Session): void;
  getAll(): Session[];
  getOne(sessionId: number): Session | null;
  getByPage(page: number): Session[];
  update(sessionId: number, session: Session): void;
  delete(sessionId: number): void;
}
