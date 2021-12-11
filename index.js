const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const program = new Command();

program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      if (contactById) {
        console.log(`Contact with id: ${id} found`);
        console.log(contactById);
        return;
      }
      console.log(`Contact with id: ${id} not found`);
      break;

    case "add":
      const contact = await addContact(name, email, phone);
      if (contact === undefined) {
        return;
      }
      console.log("Added new contact");
      console.log(contact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      if (removedContact) {
        console.log("Contact deleted");
        console.log(removedContact);
        const contacts = await listContacts();
        console.log("Updated contact list");
        console.table(contacts);
        return;
      }
      console.log(`Contact with id: ${id} not found`);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv).then(() => console.log("Successfully"));
