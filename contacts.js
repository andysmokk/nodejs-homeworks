// const fs = require("fs/promises");
// const path = require("path");
// const crypto = require("crypto");

// const contactsPath = path.resolve("./db/contacts.json");

// const readContent = async () => {
//   const content = await fs.readFile(contactsPath);
//   const contacts = JSON.parse(content);
//   return contacts;
// };

// const listContacts = async () => {
//   return await readContent();
// };

// const getContactById = async (contactId) => {
//   const contacts = await readContent();
//   const [contact] = contacts.filter((contact) => contact.id === contactId);
//   return contact;
// };

// const removeContact = async (contactId) => {
//   const contacts = await readContent();
//   // const updatedContacts = contacts.filter(
//   //   (contact) => contact.id !== contactId
//   // );
//   // await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
//   // return updatedContacts;
//   const contactIndex = contacts.findIndex(
//     (contact) => contact.id === contactId
//   );

//   if (contactIndex === -1) {
//     return;
//   }

//   const removedContact = contacts.splice(contactIndex, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return removedContact;
// };

// const addContact = async (name, email, phone) => {
//   const contacts = await readContent();
//   const newContact = { name, email, phone, id: crypto.randomUUID() };

//   const existingContact = await contacts.find((contact) => {
//     if (contact.name === name) {
//       return contact;
//     }
//   });

//   if (existingContact?.email === newContact.email) {
//     console.log(
//       `Contact with this email: ${newContact.email} already exists`.bgRed
//     );
//     return;
//   }

//   if (existingContact?.phone === newContact.phone) {
//     console.log(
//       `Contact with this phone: ${newContact.phone} already exists`.bgRed
//     );
//     return;
//   }

//   contacts.push(newContact);
//   fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// };
