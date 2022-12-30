const { program } = require("commander");
const {
  addContact,
  removeContact,
  listContacts,
  getContactById,
} = require("./contacts");
program
  .option("--action|action <type>", "action of the contact")
  .option("--id|--id <name>", "id of the contact")
  .option("--name|--name [name]", "Name of the contact")
  .option("--email|--email [name]", "Email of the contact")
  .option("--phone|--phone [name]", "Phone of the contact")
  .action((action, id, name, email, phone ) =>
    invokeAction({ action, id, name, email, phone })
  );
program.parse(process.argv);
const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);