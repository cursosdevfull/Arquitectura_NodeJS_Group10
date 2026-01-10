import { LengthVO, EmailVO, ArrayVO } from '../../../core/value-objects';
import { HashService } from '../../../core/utils';
import { Role } from '../entities';
import { v4 as uuidv4 } from 'uuid';

type UserEssentials = {
  name: string;
  email: string;
  roles: Role[];
}

export type UserCreate = UserEssentials & {
  password: string;
}

type UserOptionals = {
  id: number;
  password: string;
  refreshToken: string;
}

export type UserProps = UserEssentials & Partial<UserOptionals>;
export type UserCreateProps = UserCreate & Partial<Pick<UserOptionals, 'id' | 'refreshToken'>>;
type UserUpdate = Partial<UserEssentials>;

export class User {
  private readonly id: number;
  private name: string;
  private email: string;
  private password: string;
  private refreshToken: string;
  private roles: Role[];
  private deletedAt: Date | undefined;

  constructor(props: UserProps) {
    const nameVO = LengthVO.create('Name', props.name, 3);
    const emailVO = EmailVO.create('Email', props.email);
    const rolesVO = ArrayVO.create('Roles', props.roles);

    if (props.id) {
      this.id = props.id;
    }
    this.name = nameVO.value;
    this.email = emailVO.value;
    this.roles = rolesVO.value;

    // Si se proporciona password, validarlo, sino generar uno temporal
    if (props.password) {
      const passwordVO = LengthVO.create('Password', props.password, 6);
      this.password = passwordVO.value;
    } else {
      // Para cuando se lee desde la base de datos
      this.password = '';
    }

    // Si se proporciona refreshToken usarlo, sino generar uno nuevo
    if (props.refreshToken) {
      this.refreshToken = props.refreshToken;
    } else {
      this.refreshToken = uuidv4();
    }
  }

  static create(props: UserCreateProps): User {
    const passwordVO = LengthVO.create('Password', props.password, 6);
    const hashedPassword = HashService.hashPasswordSync(passwordVO.value);

    return new User({
      name: props.name,
      email: props.email,
      password: hashedPassword,
      refreshToken: props.refreshToken || uuidv4(),
      roles: props.roles
    });
  }

  properties() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      refreshToken: this.refreshToken,
      roles: this.roles,
      deletedAt: this.deletedAt,
    };
  }

  update(props: UserUpdate) {
    if (props.name) {
      const nameVO = LengthVO.create('Name', props.name, 3);
      this.name = nameVO.value;
    }
    if (props.email) {
      const emailVO = EmailVO.create('Email', props.email);
      this.email = emailVO.value;
    }
    if (props.roles) {
      const rolesVO = ArrayVO.create('Roles', props.roles);
      this.roles = rolesVO.value;
    }
  }

  delete() {
    this.deletedAt = new Date();
  }

  /**
   * Verifica si el password proporcionado coincide con el almacenado
   * @param password - Password en texto plano para verificar
   * @returns Promise<boolean> - true si coinciden
   */
  async verifyPassword(password: string): Promise<boolean> {
    return await HashService.verifyPassword(password, this.password);
  }

  /**
   * Verifica password de forma síncrona
   * @param password - Password en texto plano para verificar
   * @returns boolean - true si coinciden
   */
  verifyPasswordSync(password: string): boolean {
    return HashService.verifyPasswordSync(password, this.password);
  }
}
