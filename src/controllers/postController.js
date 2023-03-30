const {
  getContactsService,
  getContactByIdService,
  addContactService,
  deleteContactService,
  changeContactService,
  changeFavoriteStatusContactService,
} = require("../services/contactsService");

const getContacts = async (req, res, next) => {
  const contacts = await getContactsService();
  res.json({ contacts });
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactByIdService(contactId);
  res.json({ contact });
};

const addContact = async (req, res, next) => {
  const contact = await addContactService(req.body);
  res.json({ contact });
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContactService(contactId);
  res.json({ contact });
};

const changeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await changeContactService(contactId, req.body);
  res.json({ contact });
};

const changeFavoriteStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (favorite === undefined) {
    res.status(400).json({ message: "missing field favorite" });
  }
  const contact = await changeFavoriteStatusContactService(contactId, favorite);
  res.json({ contact });
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  changeContact,
  changeFavoriteStatusContact,
};
