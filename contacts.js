const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  // ...твій код. Повертає масив контактів.
  const results = await fs.readFile(contactsPath);
  const contactsArr = JSON.parse(results);
  return contactsArr;
};

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contactsArr = await listContacts();
  const findedContact = contactsArr.find((contact) => contact.id === contactId);
  if (!findedContact) return null;

  return findedContact;
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  const contactsArr = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contactsArr.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArr));

  return newContact;
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contactsArr = await listContacts();
  const index = contactsArr.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const [deletedContact] = contactsArr.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArr, null, 2));
  return deletedContact;
}
removeContact("e6ywwRe4jcqxXfCZOj_1e");

const contactsActions = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};

module.exports = contactsActions;
