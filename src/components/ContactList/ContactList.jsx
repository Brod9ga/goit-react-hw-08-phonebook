import Filter from 'components/Filter/Filter';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContactsItems,
  selectWordForFilter,
} from 'redux/contactListReduser';
import { deleteContact, fetchGetContactsThunk } from 'redux/operations';

const ContactList = () => {
  const contacts = useSelector(selectContactsItems);
  const wordForFilter = useSelector(selectWordForFilter);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetContactsThunk());
  }, [dispatch]);
  const filteredContacts = contacts?.filter(contact =>
    contact.name.toLowerCase().includes(wordForFilter.toLowerCase())
  );

  return (
    <div>
      
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            {contact.name}: {contact.phone}
            <button onClick={() => dispatch(deleteContact(contact.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
