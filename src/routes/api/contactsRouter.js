const express = require("express");
const router = express.Router();
const crypto = require("node:crypto");

const { validateBody } = require("../../middlewares/validation");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

router.get("/", async (req, res, next) => {
  const allContacts = await listContacts();
  res.status(200).json({ allContacts });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const { contact, status, message } = await getContactById(contactId);
  res.status(status).json({ contact, message });
});

router.post("/", validateBody, async (req, res, next) => {
  const { name, email, phone } = req.body;
  const body = { id: crypto.randomUUID(), name, email, phone };

  const { contact, status, message } = await addContact(body);
  res.status(status).json({ contact, message });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const { contact, status, message } = await removeContact(contactId);
  res.status(status).json({ contact, message });
});

router.put("/:contactId", validateBody, async (req, res, next) => {
  const { contactId } = req.params;

  const { contact, status, message } = await updateContact(contactId, req.body);
  res.status(status).json({ contact, message });
});

module.exports = router;
