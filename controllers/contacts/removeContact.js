const { contactsPath, readContent } = require("./readContent");

const removeContact = async (contactId) => {
  const contacts = await readContent();
  // const updatedContacts = contacts.filter(
  //   (contact) => contact.id !== contactId
  // );
  // await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  // return updatedContacts;
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) {
    return;
  }

  const removedContact = contacts.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
};

module.exports = { removeContact };
