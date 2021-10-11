var express = require("express");
var router = express.Router();
var token;
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send(token);
  var axios = require("axios");
  var data = JSON.stringify({
    api_key: "yAtIgtqqcX7MVVYHlLFGoEsKA0Cyr7jAow8e6GoBKhkOgplKpk1IOBMQaF15",
    api_secret: "waIpTljxaKMsubX5k8XuP9XhEEz5mgbW"
  });

  var config = {
    method: "post",
    url: "https://api-sandbox.facturify.com/api/v1/auth",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache"
    },
    data: data
  };

  axios(config)
    .then(function (response) {
      token = response.data.jwt.token;
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.post("/", function (req, res, next) {
  var axios = require("axios");
  var data = req.body;
  // console.log(req.body.token);

  var config = {
    method: "post",
    url: "https://api-sandbox.facturify.com/api/v1/factura",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    data: data
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.send("solicitud exitosa post");
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.post("/token", function (req, res, next) {});

module.exports = router;
