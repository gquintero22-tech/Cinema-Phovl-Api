const express = require('express');
const router = require("express").Router();
const controller = require("../controllers/peliculas.controller");

router.get("/", controller.getAll);

module.exports = router;

