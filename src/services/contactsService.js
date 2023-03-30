const Contact = require("../db/contactsShema");

const getContactsService = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactByIdService = async (id) => {
  const contactById = await Contact.findById(id).exec();
  return contactById;
};

const addContactService = async (body) => {
  const contact = new Contact({ ...body });
  await contact.save();

  return contact;
};

const deleteContactService = async (id) => {
  const contact = await Contact.findByIdAndDelete(id);
  return contact;
};

const changeContactService = async (id, body) => {
  const contact = await Contact.findByIdAndUpdate(id, {
    ...body,
  });
  return contact;
};

const changeFavoriteStatusContactService = async (id, favorite) => {
  const contact = await Contact.findByIdAndUpdate(id, {
    favorite,
  });

  return contact;
};

module.exports = {
  getContactsService,
  getContactByIdService,
  addContactService,
  deleteContactService,
  changeContactService,
  changeFavoriteStatusContactService,
};
