import { ModelDevice } from "./Device";

export class ModelUser {
  primaryKey: number;
  username: string;
  email: string;
  password: string;
  devices: Array<ModelDevice> = [];
  constructor(email: string, password: string) {
    this.primaryKey = Math.random();
    this.username = email;
    this.email = email;
    this.password = password;
  }
}
