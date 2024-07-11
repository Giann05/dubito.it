export class ModelAuth {
  referenceKeyUser: number;
  token: number;

  constructor(referenceKeyUser: number) {
    this.referenceKeyUser = referenceKeyUser;
    this.token = Math.random();
  }
}
