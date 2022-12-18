const { generateUniqueCode, verifyCoupon, useCoupon } = require("../controllers/coupon")
const {dashboard} = require("../controllers/student");
const router = require("express").Router();
  

router.get("/coupon", generateUniqueCode);

router.get("/verify",verifyCoupon);
router.get("/use",useCoupon);

router.get("/dashboard",dashboard);

module.exports = router