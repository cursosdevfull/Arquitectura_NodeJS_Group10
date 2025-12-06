import { Session } from '../models';
import { SessionPort } from '../ports';

export class SessionAdapter implements SessionPort {
  private sessions: Session[] = [];

  save(session: Session): void {
    this.sessions.push(session);
  }

  getAll(): Session[] {
    return this.sessions;
  }

  getOne(sessionId: number): Session | null {
    const session = this.sessions.find(
      (s) => s.properties().sessionId === sessionId,
    );
    return session || null;
  }

  getByPage(page: number): Session[] {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.sessions.slice(startIndex, endIndex);
  }

  update(sessionId: number, session: Session): void {
    const index = this.sessions.findIndex(
      (s) => s.properties().sessionId === sessionId,
    );
    if (index !== -1) {
      this.sessions[index] = session;
    }
  }

  delete(sessionId: number): void {
    const index = this.sessions.findIndex(
      (s) => s.properties().sessionId === sessionId,
    );
    if (index !== -1) {
      this.sessions.splice(index, 1);
    }
  }
}
