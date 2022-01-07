var express = require("express");
var router = express.Router();
const Control = require("../public/javascripts/Control.js");
let nuevoControl = new Control();

//home
router.get("/", async (req, res) => {
  res.render("pages/index", { repartos: await nuevoControl.reparto() });
});

//listado control
router.get("/control", async (req, res) => {
  res.render("pages/control", { listado: await nuevoControl.listar() });
});

//guardar bulto controlado
router.post("/control", async (req, res) => {
  await nuevoControl.guardar(req.body.barcode);
  res.redirect("/");
});

//eliminar bulto segun id
router.get("/control/:id/:_rev", async (req, res) => {
  await nuevoControl.eliminar(req.params.id, req.params._rev);
  res.redirect("/control");
});

//nuevo conteo
router.get("/control/nuevo", async (req, res) => {
  await nuevoControl.nuevo();
  res.redirect("/");
});

//resumen de ejecucion
router.get("/control/listado", async (req, res) => {
  res.render("partials/elements/listadoControl", {
    listado: await nuevoControl.listar(),
  });
});

module.exports = router;
