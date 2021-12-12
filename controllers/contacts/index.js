// const { readContent, contactsPath } = require("./controllers/contacts");
const { listContacts } = require("./listContacts");
const { getContactById } = require("./getContactById");
const { removeContact } = require("./removeContact");
const { addContact } = require("./addContact");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
