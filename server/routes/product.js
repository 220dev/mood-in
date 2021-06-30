const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../models/Product");

var storage = multer.diskStorage({
  // 어디에 파일을 저장할지 설정
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  // 파일을 저장할 때 어떤 이름으로 저장할지 설정
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
  // 가져온 이미지를 저장해줌
  upload(req, res, (err) => {
    if (err) {
      return req.json({ success: false, err });
    }
    // 파일 저장 path와 파일명을 불러옴
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/", (req, res) => {
  // 받아온 정보들을 DB에 넣어줌
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/products", (req, res) => {
  // LandingPage.js 에서 설정한 skip과 limit의 정보를 받아줌
  //있으면 지정값으로 limit, 없다면 limit을 20으로
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm;

  let findArgs = {};

  // key는 painters 혹은 price 가 됨
  for (let key in req.body.filters) {
    // 하나라도 체크가 되면 해당 값을 찾아서 불러오는 것
    if (req.body.filters[key].length > 0) {
      console.log("key", key);
      if (key === "price") {
        findArgs[key] = {
          //gte = greater than equal
          $gte: req.body.filters[key][0],
          //lte = Less than equal
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  // console.log("findArgs", findArgs); 데이터 출력 확인

  if (term) {
    Product.find(findArgs)
      // $test, $search : mongoDB에서 제공하는 옵션
      .find({ $text: { $search: term } })
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productInfo,
          postSize: productInfo.length,
        });
      });
  } else {
    // product collection에 들어있는 모든 상품 정보 불러오기
    //조건식으로 불러올 땐 Product.find({조건}) 이렇게 불러오면 됨
    Product.find(findArgs)
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, productInfo, postSize: productInfo.length });
      });
  }
});

router.get("/products_by_id", (req, res) => {
  // 쿼리로 가져왔으니까 바디가 아니라 쿼리로 받음
  let type = req.query.type;
  let productIds = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    productIds = ids.map((item) => {
      return item;
    });
  }

  // productsId를 이용하여 DB에서 해당 productsId와 같은 상품의 정보를 가져옴
  Product.find({ _id: { $in: productIds } })
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(product);
    });
});

module.exports = router;
