import { SessionAdapter } from '../adapters';
import { Session } from '../models';
import { SessionPort } from '../ports';

export class SessionApplication {
  private readonly adapter: SessionPort;

  constructor() {
    this.adapter = new SessionAdapter();
  }

  save(session: Session) {
    this.adapter.save(session);
  }

  getAll() {
    return this.adapter.getAll();
  }

  getOne(sessionId: number) {
    return this.adapter.getOne(sessionId);
  }

  getByPage(page: number) {
    return this.adapter.getByPage(page);
  }

  update(sessionId: number, session: Session) {
    this.adapter.update(sessionId, session);
  }

  delete(sessionId: number) {
    this.adapter.delete(sessionId);
  }
}
