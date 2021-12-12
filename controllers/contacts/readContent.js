const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

const readContent = async () => {
  const content = await fs.readFile(contactsPath);
  const contacts = JSON.parse(content);
  return contacts;
};

module.exports = { readContent, contactsPath };
