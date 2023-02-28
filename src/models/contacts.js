const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return await JSON.parse(result);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result ?? false;
};

const addContact = async (body) => {
  const contacts = await listContacts();

  const contactWithSameValue = contacts.find(
    (contact) => contact.phone === body.phone || contact.email === body.email
  );
  if (contactWithSameValue) return false;

  contacts.push(body);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return true;
};

const removeContact = async (contactId) => {
  const deletedContact = await getContactById(contactId);
  if (!deletedContact) return false;

  const contacts = await listContacts();
  const newContacts = contacts.filter((contact) => contact.id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));

  return deletedContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  const contacts = await listContacts();

  const updatedContact = await getContactById(contactId);
  if (!updatedContact) return 404;

  const contactWithSameValue = contacts.find(
    (contact) => contact.phone === phone || contact.email === email
  );
  if (contactWithSameValue) return 400;

  const newContacts = contacts.map((contact) => {
    if (contact.id === contactId) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
    }
    return contact;
  });

  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));

  updatedContact.name = name;
  updatedContact.email = email;
  updatedContact.phone = phone;

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
