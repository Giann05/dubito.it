import { DocAPI } from "./DocAPI";
import { ModelAuth } from "./models/Auth";
import { ModelDevice } from "./models/Device";
import { ModelFavorite } from "./models/Favorite";
import { ModelReport } from "./models/Report";
import { ModelRewiew } from "./models/Rewiew";
import { ModelUser } from "./models/User";
import { ModelAd } from "./models/ad";

export class App {
  users: Array<ModelUser> = [];
  ads: Array<ModelAd> = [];
  rewiews: Array<ModelRewiew> = [];
  auth: Array<ModelAuth> = [];
  report: Array<ModelReport> = [];
  favorite: Array<ModelFavorite> = [];
  getUserByToken(token: number) {
    const authFound = this.auth.find(function (auth) {
      return auth.token == token;
    });
    if (!authFound) {
      return null;
    } else {
      return authFound;
    }
  }
  addAds(
    title: string,
    description: string,
    category: string,
    urlPhoto: string,
    status: string,
    price: number,
    address: string,
    token: number
  ) {
    const authFound = this.getUserByToken(token);
    if (!authFound) {
      console.log("errore,token non valido");
      return false;
    } else {
      const ads = new ModelAd(
        authFound.referenceKeyUser,
        title,
        description,
        category,
        urlPhoto,
        status,
        price,
        address
      );
      this.ads = [...this.ads, ads];
      return true;
    }
  }
  addRewiew(
    referenceKeyAds: number,
    title: string,
    desciption: string,
    rating: number,
    token: number
  ) {
    const authFound = this.getUserByToken(token);
    if (!authFound) {
      console.log("errore,token non valido");
    } else {
      const rewiew = new ModelRewiew(
        authFound.referenceKeyUser,
        referenceKeyAds,
        title,
        desciption,
        rating
      );
      this.rewiews = [...this.rewiews, rewiew];
    }
    console.log("recensione aggiunto con successo");
  }
  addFavorite(token: number, referenceKeyAds: number) {
    const authFound = this.getUserByToken(token);
    if (!authFound) {
      console.log("errore,token non valido");
    } else {
      const favorite = new ModelFavorite(
        authFound.referenceKeyUser,
        referenceKeyAds
      );
      this.favorite = [...this.favorite, favorite];
    }
    console.log("recensione aggiunto con successo");
  }
  addReport(
    referenceKeyAds: number,
    desciption: string,
    status: string,
    token: number
  ) {
    const authFound = this.getUserByToken(token);
    if (!authFound) {
      console.log("errore,token non valido");
    } else {
      const report = new ModelReport(
        authFound.referenceKeyUser,
        referenceKeyAds,
        desciption,
        status
      );
      this.report = [...this.report, report];
    }
    console.log("report aggiunto con successo");
  }

  updateAdAsSold(
    referenceKeyAds: number,
    referenceKeyUserPurchased: number,
    token: number
  ) {
    const authFound = this.getUserByToken(token);
    let adFound = null;
    if (!authFound) {
      console.log("errore,token non valido");
      return;
    } else {
      adFound = this.ads.find(function (ad) {
        if (ad.primaryKey === referenceKeyAds) return true;
        else return false;
      });
    }
    if (!adFound) {
      console.log("annuncio non trovato");
    } else {
      if (authFound.referenceKeyUser !== adFound.referenceKeyUser) {
        console.log("Autore non riconosciuto");
      } else {
        this.ads = this.ads.map(function (ad) {
          if (adFound.primaryKey === ad.primaryKey) {
            return {
              ...ad,
              referenceKeyUserPurchased: referenceKeyUserPurchased,
            };
          } else {
            return { ...ad };
          }
        });
      }
    }
  }

  deleteAds(referenceKeyAds: number, token: number) {
    const authFound = this.getUserByToken(token);
    if (!authFound) {
      console.log("errore,token non valido");
    } else {
      const adFound = this.ads.find(function (ad) {
        if (ad.primaryKey == referenceKeyAds) return true;
        else {
          return false;
        }
      });
      if (!adFound) {
        console.log("errore,annuncio non trovato");
      } else {
        if (authFound.referenceKeyUser !== adFound.referenceKeyUser) {
          console.log("Autore non riconosciuto");
        } else {
          this.ads = this.ads.filter(function (ad) {
            if (adFound.primaryKey !== ad.primaryKey) return true;
            else return false;
          });
        }

        console.log("annuncio rimosso con successo");
      }
    }
  }
  deleteRewiew(referenceKeyRewiew: number, token: number) {
    const authFound = this.getUserByToken(token);
    if (!authFound) {
      console.log("errore,token non valido");
    } else {
      const adFound = this.rewiews.find(function (rewiew) {
        if (rewiew.primaryKey == referenceKeyRewiew) return true;
        else {
          return false;
        }
      });
      if (!adFound) {
        console.log("errore,recensione non trovata");
      } else {
        if (authFound.referenceKeyUser !== adFound.referenceKeyUser) {
          console.log("Autore non riconosciuto");
        } else {
          this.rewiews = this.rewiews.filter(function (rewiew) {
            if (adFound.primaryKey !== rewiew.primaryKey) return true;
            else return false;
          });
        }

        console.log("recensione rimossa con successo");
      }
    }
  }
  deleteAccount(referenceKeyUser: number, token: number) {
    const authFound = this.getUserByToken(token);
    if (!authFound) {
      console.log("errore,token non valido");
    } else {
      const userFound = this.auth.find(function (user) {
        if (user.referenceKeyUser == referenceKeyUser) return true;
        else {
          return false;
        }
      });
      if (!userFound) {
        console.log("Autore non riconosciuto");
      } else {
        this.auth = this.auth.filter(function (key) {
          if (userFound.referenceKeyUser !== key.referenceKeyUser) return true;
          else return false;
        });
        this.users = this.users.filter(function (key) {
          if (userFound.referenceKeyUser !== key.primaryKey) return true;
          else return false;
        });
      }
    }
    console.log("account eliminato con successo");
  }
  deleteReport(referenceKeyReport: number, token: number) {
    const authFound = this.getUserByToken(token);
    if (!authFound) {
      console.log("errore,token non valido");
    } else {
      const adFound = this.report.find(function (report) {
        if (report.primaryKey == referenceKeyReport) return true;
        else {
          return false;
        }
      });
      if (!adFound) {
        console.log("errore,report non trovato");
      } else {
        if (authFound.referenceKeyUser !== adFound.referenceKeyUser) {
          console.log("Autore non riconosciuto");
        } else {
          this.report = this.report.filter(function (rewiew) {
            if (adFound.primaryKey !== rewiew.primaryKey) return true;
            else return false;
          });
        }

        console.log("report rimosso con successo");
      }
    }
  }
  deleteFavorite(token: number, referenceKeyfavorite: number) {
    const authFound = this.getUserByToken(token);
    if (!authFound) {
      console.log("errore,token non valido");
    } else {
      const adFound = this.favorite.find(function (favorite) {
        if (favorite.primaryKey == referenceKeyfavorite) return true;
        else {
          return false;
        }
      });
      if (!adFound) {
        console.log("errore,recensione non trovata");
      } else {
        if (authFound.referenceKeyUser !== adFound.referenceKeyUser) {
          console.log("Autore non riconosciuto");
        } else {
          this.favorite = this.favorite.filter(function (favorite) {
            if (adFound.primaryKey !== favorite.primaryKey) return true;
            else return false;
          });

          console.log("preferito rimosso con successo");
        }
      }
    }
  }

  register(email: string, password: string) {
    const userFound = this.users.find(function (user) {
      if (user.email === email) return true;
      return false;
    });
    if (!!userFound) {
      console.log("utente già registrato");
      return true;
    } else {
      const newUser = new ModelUser(email, password);
      this.users = [...this.users, newUser];
      console.log("Registazione effettuata con successo");
      return false;
    }
  }
  login(email: string, password: string) {
    const userFound = this.users.find(function (user) {
      if (user.email == email && user.password == password) {
        return true;
      }
      return false;
    });
    if (!!userFound) {
      // se esiste
      if (userFound.devices.length < 2) {
        const authFound = this.getAuthByUserID(userFound.primaryKey);
        if (!!authFound) {
          console.log("Gia' autenticato");
        } else {
          const newAuth = new ModelAuth(userFound.primaryKey);
          this.auth = [...this.auth, newAuth];
          return newAuth.token;
        }
      } else {
        console.log("Troppi devices");
      }
    } else {
      console.log("email/password sbagliati");
    }
  }

  getAuthByUserID(primaryKey: number) {
    return this.auth.find(function (auth) {
      {
        if (auth.referenceKeyUser == primaryKey) {
          return true;
        }
        return false;
      }
    });
  }
  logout(token: number) {
    const authFound = this.getUserByToken(token);
    if (!authFound) {
      console.log("errore,token non valido");
      return false;
    }
    this.auth = this.auth.filter(function (key) {
      if (token !== key.token) return true;
      else return false;
    });
    return true;
  }
  updateRewiew(
    referenceKeyRewiew: number,
    title: string,
    description: string,
    rating: number,
    token: number
  ) {
    const authFound = this.getUserByToken(token);
    let adFound = null;
    if (!authFound) {
      console.log("errore,token non valido");
      return;
    } else {
      adFound = this.rewiews.find(function (rewiew) {
        if (rewiew.primaryKey == referenceKeyRewiew) return true;
        else {
          return false;
        }
      });
    }
    if (!adFound) {
      console.log("errore,annuncio non trovato");
    } else {
      if (authFound.referenceKeyUser !== adFound.referenceKeyUser) {
        console.log("Autore non riconosciuto");
      } else {
        this.rewiews = this.rewiews.map(function (rewiew) {
          if (adFound.primaryKey === rewiew.primaryKey) {
            return {
              ...rewiew,
              title: title,
              description: description,
              rating: rating,
            };
          } else {
            return { ...rewiew };
          }
        });
      }
    }
  }
  updateAds(
    referenceKeyAds: number,
    title: string,
    desciption: string,
    category: string,
    urlPhoto: string,
    token: number
  ) {
    const authFound = this.getUserByToken(token);
    let adFound = null;
    if (!authFound) {
      console.log("errore,token non valido");
      return;
    } else {
      adFound = this.ads.find(function (ad) {
        if (ad.primaryKey == referenceKeyAds) return true;
        else {
          return false;
        }
      });
    }
    if (!adFound) {
      console.log("errore,annuncio non trovato");
    } else {
      if (authFound.referenceKeyUser !== adFound.referenceKeyUser) {
        console.log("Autore non riconosciuto");
      } else {
        this.ads = this.ads.map(function (ad) {
          if (adFound.primaryKey === ad.primaryKey) {
            return {
              ...ad,
              title: title,
              desciption: desciption,
              category: category,
              urlPhoto: urlPhoto,
            };
          } else {
            return { ...ad };
          }
        });
      }
    }
  }
  updateReport(
    referenceKeyReport: number,
    desciption: string,
    status: string,
    token: number
  ) {
    const authFound = this.getUserByToken(token);
    let adFound = null;
    if (!authFound) {
      console.log("errore,token non valido");
      return;
    } else {
      adFound = this.report.find(function (report) {
        if (report.primaryKey == referenceKeyReport) return true;
        else {
          return false;
        }
      });
    }
    if (!adFound) {
      console.log("errore,report non trovato");
    } else {
      if (authFound.referenceKeyUser !== adFound.referenceKeyUser) {
        console.log("Autore non riconosciuto");
      } else {
        this.report = this.report.map(function (report) {
          if (adFound.primaryKey === report.primaryKey) {
            return {
              ...report,
              desciption: desciption,
              status: status,
            };
          } else {
            return { ...report };
          }
        });
      }
    }
  }

  getUserbyUserID(id: ModelUser["primaryKey"]) {
    function OnFind(user: ModelUser) {
      if (user.primaryKey == id) {
        return true;
      }
      return false;
    }
    return this.users.find(OnFind);
  }
  registerDevice(id: number, token: number, name: string) {
    const auth = this.getUserByToken(token);
    if (!auth) {
      console.log("Errore, token non valido");
      return;
    }

    const user = this.getUserbyUserID(auth.referenceKeyUser);
    if (!user) {
      console.log("Errore, utente non trovato");
      return;
    }

    user.devices = [
      ...user.devices,
      new ModelDevice(user.primaryKey, name, id),
    ];
    console.log("Dispositivo registrato con successo");
  }

  getListUsers(token: number) {
    const auth = this.getUserByToken(token);
    if (!auth) {
      console.log("errore,token non valido");
      return;
    } else {
      return this.users;
    }
  }
  getlistAds(token: number) {
    const auth = this.getUserByToken(token);
    if (!auth) {
      console.log("errore,token non valido");
      return;
    } else {
      return this.ads;
    }
  }
  getlistUserlogged(token: number) {
    const auth = this.getUserByToken(token);
    if (!auth) {
      console.log("errore,token non valido");
      return;
    } else {
      return this.auth;
    }
  }
  getListFavorites(token: number) {
    const auth = this.getUserByToken(token);
    if (!auth) {
      console.log("errore,token non valido");
      return null;
    } else {
      const list = this.favorite.filter(function (users) {
        if (auth.referenceKeyUser == users.referenceKeyUser) {
          return true;
        } else {
          return false;
        }
      });
      return list;
    }
  }
}

const apis = {
  register: new DocAPI("/auth/register", "POST", false),
  login: new DocAPI("/auth/login", "POST", false),
  logout: new DocAPI("/auth/logout", "DELETE", true),
  deleteAccount: new DocAPI("/users/{referenceKeyUser}", "DELETE", true),
  createAd: new DocAPI("/ads", "POST", true),
  editAd: new DocAPI("/ads/{referenceKeyAds}", "PUT", true),
  updateAdAsSold: new DocAPI("/ads?ID_AD&action=sold", "PATCH", true),
  deleteAd: new DocAPI("/ads/{referenceKeyAds}", "DELETE", true),
  addReview: new DocAPI("/review/{referenceKeyAds}", "POST", true),
  editReview: new DocAPI("/reviews/{referenceKeyReview}", "PUT", true),
  deleteReview: new DocAPI("/reviews/{referenceKeyReview}", "DELETE", true),
  addFavorite: new DocAPI("/favorites", "POST", true),
  editFavorite: new DocAPI("/favorites/{referenceKeyFavorite}", "PUT", true),
  removeFavorite: new DocAPI(
    "/favorites/{referenceKeyFavorite}",
    "DELETE",
    true
  ),
  registerDevice: new DocAPI("/devices/{referenceKeyUser}", "POST", true),
  listUsers: new DocAPI("/users", "GET", true),
  listAds: new DocAPI("/ads", "GET", true),
  listUserlogged: new DocAPI("/auth", "GET", true),
  listFavoritesUser: new DocAPI("/favorites/{referenceKeyUser}", "GET", true),
};
