import express, { Request, Response } from "express";
import { App } from "./dubito";
const app = express();
const myApp = new App();
const routerApi = express.Router();
app.use(express.json());
const port = process.env.PORT || 3000;

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
  const succes = myApp.login(email, password);
  if (succes) return res.status(200).json({ message: "accesso consentito" });
  else return res.status(400).json({ message: "accesso non consentito" });
});

// app.delete("/auth/logout", function (req: Request, res: Response) {
//   const token = req.body.token;
//   if (!token) return res.status(400).json({ message: "token non esistente" });
//   const succes = myApp.logout(token);
//   if (succes) return res.status(200).json({ message: "utente registrato" });
//   else return res.status(400).json({ message: "utente non registrato" });
// });
// app.delete("/auth/logout", function (req: Request, res: Response) {
//   const token = req.body.token;
//   if (!token) return res.status(400).json({ message: "token non esistente" });
//   const succes = myApp.logout(token);
//   if (succes) return res.status(200).json({ message: "utente registrato" });
//   else return res.status(400).json({ message: "utente non registrato" });
// });
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
