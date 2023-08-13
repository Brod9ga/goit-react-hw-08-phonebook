import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, selectContactsItems} from "redux/contactListReduser";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phone, setNumber] = useState("");
  const contacts = useSelector(selectContactsItems);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const existingContact = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert("Контакт с таким именем уже существует!");
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      phone,
    };

    dispatch(addContact(newContact));

   
    setName("");
    setNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Name</h2>
        <input
          onChange={(event) => setName(event.target.value)}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div>
        <h2>Phone number</h2>
        <input
          onChange={(event) => setNumber(event.target.value)}
          value={phone}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <button type="submit">Add number</button>
    </form>
  );
};

export default ContactForm;
