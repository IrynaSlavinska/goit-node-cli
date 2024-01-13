const { program } = require("commander");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await listContacts();
      console.log("Contacts list: ", list);
      break;

    case "get":
      const contact = await getContactById(id);
      console.log("Get contact with this ID: ", contact);
      break;

    case "add":
      const contacts = await addContact(name, email, phone);
      console.log("Add this contact: ", contacts);
      break;

    case "remove":
      const deletedContact = await removeContact();
      console.log("Delete this contact: ", deletedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
