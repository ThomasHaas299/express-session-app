const express = require("express");
const router = express.Router();

const {
  root,
  setValueInSession,
  getValue,
  clearSession,
} = require("../handler");

router.get("/", root);
router.get("/set/:anyValue", setValueInSession);
router.get("/get", getValue);
router.get("/clean", clearSession);

module.exports = router;
