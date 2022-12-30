const { readFile, writeFile } = require("fs/promises");

const node_uid = require("node-uid");
const contactsPath = "./db/contacts.json";

async function listContacts() {
  const content = await readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(content);
  contacts.forEach(({ name, email, phone }) => {
    console.log(`${name}\nEmail\t${email}\nPhone\t${phone}`);
  });
}

async function getContactById(contactId) {
  const content = await readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(content);
  const contact = contacts.find((el) => el.id === contactId);
  console.log(`${contact.name}\nEmail\t${contact.email}\nPhone\t${contact.phone}`);
}

async function removeContact(contactId) {
  const content = await readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(content);

  const contact = contacts.filter((el) => el.id !== contactId);
  contacts.push(contact);
  await writeFile(contactsPath, JSON.stringify(contact, undefined, 2));
  console.log("The contact has been deleted");
}

async function addContact(name, email, phone) {
  console.log(name, email, phone);
  const content = await readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(content);

  contacts.push({ id: node_uid(), name, email, phone });
  await writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));

}

module.exports = { addContact, removeContact, listContacts, getContactById };
