const express = require("express");
const router = express.Router();

const { validateBody } = require("../../middlewares/validation");
const {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  changeContact,
  changeFavoriteStatusContact,
} = require("../../controllers/postController");
const { asyncWrapper } = require("../../helpers/apiHelpers");

router.get("/", asyncWrapper(getContacts));
router.get("/:contactId", asyncWrapper(getContactById));
router.post("/", validateBody, asyncWrapper(addContact));
router.delete("/:contactId", asyncWrapper(deleteContact));
router.put("/:contactId", validateBody, asyncWrapper(changeContact));
router.patch("/:contactId/favorite", asyncWrapper(changeFavoriteStatusContact));

module.exports = router;
