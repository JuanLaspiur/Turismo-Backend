const { Router } = require("express");
const handleValidationErrors = require("../middlewares/validator_routes");

const {
  getReferences,
  getReferenceById,
  createReference,
  updateReference,
  deleteReference,
} = require("../controllers/reference.controller");

const referenceValidations = require("../middlewares/reference_validator_routes");
const router = Router();

router.post("/",referenceValidations.createReference,handleValidationErrors,createReference
);
router.get("/", getReferences);
router.get("/:id", getReferenceById);
router.put("/:id", updateReference);
router.delete("/:id", deleteReference);

module.exports = router;
