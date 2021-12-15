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
  constructor(action, id, name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.id = id;
    this.action = action;
  }

  readContent = async () => {
    const content = await fs.readFile(contactsPath);
    const contacts = JSON.parse(content);
    return contacts;
  };

  addContact = async (name, email, phone) => {
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

  invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        console.log("Current contact list".underline.yellow);
        console.table(contacts);
        break;

      case "get":
        const contactById = await getContactById(id);
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
        const removedContact = await removeContact(id);
        if (removedContact) {
          console.log("Contact deleted".underline.yellow);
          console.log(removedContact);
          const contacts = await listContacts();
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

  init = () => {
    this.invokeAction(
      this.action,
      this.id,
      this.name,
      this.email,
      this.phone
    ).then(() => console.log("Successfully".underline.yellow));
  };
}

module.exports = new Contacts(argv);
