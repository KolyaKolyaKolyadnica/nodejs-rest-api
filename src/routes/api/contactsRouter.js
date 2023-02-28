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
  try {
    const allContacts = await listContacts();
    res.status(200).json({ allContacts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contactById = await getContactById(contactId);

    contactById
      ? res.status(200).json({ contactById })
      : res
          .status(400)
          .json({ contactById: `Not found contact with id: ${contactId}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", validateBody, async (req, res, next) => {
  const { name, email, phone } = req.body;
  const body = { id: crypto.randomUUID(), name, email, phone };

  try {
    const isContactAdded = await addContact(body);
    isContactAdded
      ? res.status(200).json({ addContact: req.body })
      : res.status(400).json({ addContact: "Email and phone must be unique" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const deletedContact = await removeContact(contactId);
    deletedContact
      ? res.status(200).json({ deletedContact })
      : res
          .status(404)
          .json({ deletedContact: `Not found contact with id: ${contactId}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:contactId", validateBody, async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const updatedContact = await updateContact(contactId, req.body);

    switch (updatedContact) {
      case 400:
        res
          .status(400)
          .json({ deletedContact: "Email and phone must be unique" });
        break;

      case 404:
        res
          .status(404)
          .json({ deletedContact: `Not found contact with id: ${contactId}` });
        break;

      default:
        res.status(200).json({ updatedContact });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
