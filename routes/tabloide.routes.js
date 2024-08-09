const { Router } = require("express");
const handleValidationErrors = require("../middlewares/validator_routes");
// Controller
const {
  getTabloides,
  getTabloideById,
  createTabloide,
  updateTabloide,
  deleteTabloide,
} = require("../controllers/tabloide.controller");

const tabloideValidations = require("../middlewares/tabloide_validator_routes");
const router = Router();

router.post("/", tabloideValidations.createTabloide, handleValidationErrors, createTabloide);

router.get("/", getTabloides);
router.get("/:id", getTabloideById);
router.put("/:id", updateTabloide);
router.delete("/:id", deleteTabloide);

module.exports = router;
