import { ModelUser } from "./User";
import { ModelAd } from "./ad";

export class ModelReport {
  primaryKey: number;
  referenceKeyUser: ModelUser["primaryKey"];
  referenceKeyAds: ModelAd["primaryKey"];
  desciption: string;
  status: string;

  constructor(
    referenceKeyUser: number,
    referenceKeyAds: number,
    desciption: string,
    status: string
  ) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.referenceKeyAds = referenceKeyAds;
    this.desciption = desciption;
    this.status = status;
  }
}
