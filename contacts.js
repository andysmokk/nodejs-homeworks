const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const readContent = async () => {
  const contactsPath = path.resolve("./db/contacts.json");
  const content = await fs.readFile(contactsPath);
  const contacts = JSON.parse(content);
  return contacts;
};

// const contactsPath = path.resolve("./db/contacts.json");
// console.log(contacts);

const listContacts = async () => {
  return await readContent();
};

function getContactById(contactId) {
  // ...твой код
}

function removeContact(contactId) {
  // ...твой код
}

function addContact(name, email, phone) {
  // ...твой код
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
