import { ModelUser } from "./User";

export class ModelDevice {
  primaryKey: number;
  referenceKeyUser: ModelUser["primaryKey"];
  id: number;
  name: string;

  constructor(referenceKeyUser: number, name: string, id: number) {
    this.primaryKey = Math.random();
    this.id = id;
    this.referenceKeyUser = referenceKeyUser;
    this.name = name;
  }
}
