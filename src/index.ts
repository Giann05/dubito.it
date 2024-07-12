import express, { Request, Response } from "express";
import { App } from "./dubito";
import { setupSwagger } from "../swagger";
const app = express();
const myApp = new App();
const routerApi = express.Router();
app.use(express.json());
const port = process.env.PORT || 3000;
setupSwagger(app);

app.get("/ads/:pippo", function (req: Request, res: Response) {
  //req.params.ad;
  //const addlist = myApp.addAds;
  return res.json({
    param: req.params.pippo,
    bodyparam: req.body.test,
    queryParam: req.query.name,
    queryParam2: req.query.lastname,
  });
});

app.post("/auth/register", function (req: Request, res: Response) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password)
    return res.status(400).json({ message: "email o password mancanti" });
  const succes = myApp.register(email, password);
  if (succes) return res.status(200).json({ message: "utente registrato" });
  else return res.status(400).json({ message: "utente non registrato" });
});
app.post("/auth/login", function (req: Request, res: Response) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password)
    return res.status(400).json({ message: "email o password mancanti" });
  const token = myApp.login(email, password);
  if (token) return res.status(200).json(token);
  else return res.status(400).json({ message: "accesso non consentito" });
});

app.delete("/auth/logout", function (req: Request, res: Response) {
  const token = req.headers.authorization;
  if (!token) return res.status(400).json({ message: "token non esistente" });
  const succes = myApp.logout(Number(token));
  if (succes)
    return res.status(200).json({ message: " logout utente effettuato" });
  else return res.status(400).json({ message: "logout utente non effettuato" });
});

app.post("/ads", function (req: Request, res: Response) {
  const token = Number(req.headers.authorization);
  if (!token) return res.status(400).json({ message: "token non esistente" });
  const { title, description, category, urlPhoto, status, price, address } =
    req.body;
  if (
    !title ||
    !description ||
    !category ||
    !urlPhoto ||
    !status ||
    !price ||
    !address
  ) {
    return res.status(400).json({ message: "parametri mancanti" });
  }
  const succes = myApp.addAds(
    title,
    description,
    category,
    urlPhoto,
    status,
    price,
    address,
    token
  );
  if (succes) return res.status(200).json({ message: "annuncio aggiunto" });
  else return res.status(400).json({ message: "accesso non consentito" });
});
app.get("/ads", function (req: Request, res: Response) {
  const token = Number(req.headers.authorization);
  if (!token) return res.status(400).json({ message: "token non esistente" });
  const ads = myApp.getlistAds(token);
  if (ads) return res.status(200).json(ads);
  else return res.status(400).json({ message: "non ci sono annunci" });
});
app.get("/users", function (req: Request, res: Response) {
  const token = Number(req.headers.authorization);
  if (!token) return res.status(400).json({ message: "token non esistente" });
  const users = myApp.getListUsers(token);
  if (users) return res.status(200).json(users);
  else return res.status(400).json({ message: "non ci sono utenti" });
});
app.get("/favorites/:referenceKeyUser", function (req: Request, res: Response) {
  const token = Number(req.headers.authorization);
  if (!token) return res.status(400).json({ message: "token non esistente" });
  const favorite = myApp.getListFavorites(token);
  if (favorite) return res.status(200).json(favorite);
  else return res.status(400).json({ message: "non ci sono annunci" });
});
// routerApi.use("use/", routerApi),
//   app.get("/", function (req: Request, res: Response) {
//     return res.status(200).sendFile(__dirname + "/index.html");
//   });
app.get("/", function (req: Request, res: Response) {
  return res.status(200).sendFile(__dirname + "/index.html");
});
// app.get("/", function (req: Request, res: Response) {
//   return res.json({ message: "hello world" });
// });
app.get("/create-user", function (req: Request, res: Response) {
  const obj = { name: "" };
  obj.name = "John Doe";
  return res.json(obj);
});
app.listen(port, function () {
  console.log(`Server is running on http://localhost:${port}`);
});
// app.get("/create-user", function (req: Request, res: Response) {
//   return res.send("<h1>ciaooo</h1>");
// });
