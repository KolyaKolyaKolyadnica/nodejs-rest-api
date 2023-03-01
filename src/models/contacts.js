const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return await JSON.parse(result);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact
    ? {
        contact,
        status: 200,
        message: "Successfully find contact by id",
      }
    : {
        contact,
        status: 404,
        message: `Error: Not found contact with id: ${contactId}`,
      };
};

const addContact = async (body) => {
  const contacts = await listContacts();

  const contactWithSameValue = contacts.find(
    ({ phone, email }) => phone === body.phone || email === body.email
  );
  if (contactWithSameValue)
    return {
      contact: contactWithSameValue,
      status: 400,
      message: "Error: Duplicated contact",
    };

  contacts.push(body);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return {
    contact: body,
    status: 200,
    message: "Successfully add contact",
  };
};

const removeContact = async (contactId) => {
  const data = await getContactById(contactId);
  if (!data.contact) return data;

  const contacts = await listContacts();
  const newContacts = contacts.filter((contact) => contact.id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));

  return {
    contact: data.contact,
    status: 200,
    message: "Successfully deleted",
  };
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const data = await getContactById(contactId);
  if (!data.contact) return data;

  const contactWithSameValue = contacts.find(
    ({ id, phone, email }) =>
      (phone === body.phone || email === body.email) && id !== contactId
  );
  if (contactWithSameValue)
    return {
      contact: contactWithSameValue,
      status: 400,
      message: "Email and phone must be unique",
    };

  const newContacts = contacts.map(({ id, name, email, phone }) => {
    if (id === contactId) {
      name = body.name;
      email = body.email;
      phone = body.phone;
    }
    return { id, name, email, phone };
  });

  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));

  return {
    contact: { id: contactId, ...body },
    status: 200,
    message: "Successfully update",
  };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
