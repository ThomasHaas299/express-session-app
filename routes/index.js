const express = require("express");
const checkSessionValue = require("../middleware/checkSessionValue");
const handler = require("../handler");

const router = express.Router();

router.get("/", handler.root);
router.get("/set/:anyValue", handler.setValueInSession);
router.get("/get", handler.getValue);
router.get("/clean", handler.clearSession);
router.get("/check", checkSessionValue, handler.reportValidSession);
router.post("/login", handler.login);
router.get("/login", handler.loginForm);

module.exports = router;
