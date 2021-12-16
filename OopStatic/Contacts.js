const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const { Command } = require("commander");
const colors = require("colors");

const program = new Command();
program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");
program.parse(process.argv);
const argv = program.opts();

const contactsPath = path.resolve("./db/contacts.json");

class Contacts {
  static readContent = async () => {
    const content = await fs.readFile(contactsPath);
    const contacts = JSON.parse(content);
    return contacts;
  };

  static listContacts = async () => {
    return await this.readContent();
  };

  static addContact = async (name, email, phone) => {
    const contacts = await this.readContent();
    const newContact = { name, email, phone, id: crypto.randomUUID() };

    const existingContact = await contacts.find((contact) => {
      if (contact.name === name) {
        return contact;
      }
    });

    if (existingContact?.email === newContact.email) {
      console.log(
        `Contact with this email: ${newContact.email} already exists`.bgRed
      );
      return;
    }

    if (existingContact?.phone === newContact.phone) {
      console.log(
        `Contact with this phone: ${newContact.phone} already exists`.bgRed
      );
      return;
    }

    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  };

  static getContactById = async (contactId) => {
    const contacts = await this.readContent();
    const [contact] = contacts.filter((contact) => contact.id === contactId);
    return contact;
  };

  static removeContact = async (contactId) => {
    const contacts = await this.readContent();
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

  static invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
      case "list":
        const contacts = await this.listContacts();
        console.log("Current contact list".underline.yellow);
        console.table(contacts);
        break;

      case "get":
        const contactById = await this.getContactById(id);
        if (contactById) {
          console.log(`Contact with id: ${id} found`.underline.yellow);
          console.log(contactById);
          return;
        }
        console.log(`Contact with id: ${id} not found`.bgRed);
        break;

      case "add":
        const contact = await this.addContact(name, email, phone);
        if (contact === undefined) {
          return;
        }
        console.log("Added new contact".underline.yellow);
        console.log(contact);
        break;

      case "remove":
        const removedContact = await this.removeContact(id);
        if (removedContact) {
          console.log("Contact deleted".underline.yellow);
          console.log(removedContact);
          const contacts = await this.listContacts();
          console.log("Updated contact list".underline.yellow);
          console.table(contacts);
          return;
        }
        console.log(`Contact with id: ${id} not found`.bgRed);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  };

  static init = (action, id, name, email, phone) => {
    this.invokeAction(action, id, name, email, phone).then(() =>
      console.log("Successfully".underline.yellow)
    );
  };
}

module.exports = Contacts.init(argv);
