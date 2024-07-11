import { ModelUser } from "./User";

export class ModelAd {
  primaryKey: number;
  referenceKeyUserPurchased: ModelUser["primaryKey"];
  addres: string;
  referenceKeyUser: ModelUser["primaryKey"];
  title: string;
  desciption: string;
  category: string;
  urlPhotorlPhoto: string;
  status: string;
  price: number;
  constructor(
    referenceKeyUser: number,
    title: string,
    desciption: string,
    category: string,
    urlPhoto: string,
    status: string,
    price: number,
    address: string
  ) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.title = title;
    this.desciption = desciption;
    this.category = category;
    this.urlPhotorlPhoto = urlPhoto;
    this.status = status;
    this.price = price;
    this.referenceKeyUserPurchased = NaN;
    this.addres = address;
  }
}
