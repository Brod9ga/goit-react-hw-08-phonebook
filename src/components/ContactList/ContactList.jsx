import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, fetchGetContactsThunk, selectContactsItems, selectWordForFilter} from "redux/contactListReduser";


const ContactList = () => {
  const contacts = useSelector(selectContactsItems);
  const wordForFilter = useSelector(selectWordForFilter)

const dispatch=useDispatch()
useEffect(() => { 
  dispatch(fetchGetContactsThunk());
}, [dispatch]);
  const filteredContacts = contacts?.filter(contact =>
    contact.name.toLowerCase().includes(wordForFilter.toLowerCase())
  );
 

  return (
    <ul>
      {filteredContacts.map(contact => (
        <li key={contact.id}>
          {contact.name}: {contact.phone}
          <button onClick={() => dispatch(deleteContact(contact.id))}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
