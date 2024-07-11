import { ModelUser } from "./User";
import { ModelAd } from "./ad";

export class ModelFavorite {
  primaryKey: number;
  referenceKeyUser: ModelUser["primaryKey"];
  referenceKeyAds: ModelAd["primaryKey"];

  constructor(referenceKeyUser: number, referenceKeyAds: number) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.referenceKeyAds = referenceKeyAds;
  }
}
