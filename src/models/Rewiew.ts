import { ModelUser } from "./User";
import { ModelAd } from "./ad";

export class ModelRewiew {
  primaryKey: number;
  referenceKeyUser: ModelUser["primaryKey"];
  referenceKeyAds: ModelAd["primaryKey"];
  title: string;
  desciption: string;
  rating: number;
  date: Date;
  constructor(
    referenceKeyUser: number,
    referenceKeyAds: number,
    title: string,
    desciption: string,
    rating: number
  ) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.referenceKeyAds = referenceKeyAds;
    this.title = title;
    this.desciption = desciption;
    this.rating = rating;
    this.date = new Date();
  }
}
