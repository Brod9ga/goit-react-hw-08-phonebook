import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from 'components/Loader/Loader';
import { selectAuthentificated } from 'redux/authReducer';
import {
  addContactThunk,
  deleteContactThunk,
  requestContactsThunk,
  selectContactsError,
  selectContactsIsLoading,
  selectUserContacts,
} from 'redux/contactListReduser';
import { ContactsSyled, StyledSubmitBtn } from './Contacts.styled';

const Contacts = () => {
  const authentificated = useSelector(selectAuthentificated);
  const contacts = useSelector(selectUserContacts);
  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authentificated) return;

    dispatch(requestContactsThunk());
  }, [authentificated, dispatch]);

  const handleDeleteContact = contactId => {
    dispatch(deleteContactThunk(contactId));
  };

  const [filter, setFilter] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;

    const name = form.elements.contactName.value;
    const number = form.elements.contactNumber.value;

    if (contacts.some(contact => contact.name === name))
      return alert(`Contact with name ${name} already exists!`);

    dispatch(addContactThunk({ name, number }));
  };

  const showContacts = Array.isArray(contacts) && contacts.length > 0;

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  return (
    <ContactsSyled>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Name:</p>
          <input name="contactName" type="text" required />
        </label>
        <br />
        <label>
          <p>Number:</p>
          <input name="contactNumber" type="text" required />
        </label>
        <br />
        <StyledSubmitBtn htmlType="submit">Add contact</StyledSubmitBtn>
        <label>
          <p>Filter:</p>
          <input
            name="contactFilter"
            type="text"
            value={filter}
            onChange={handleFilterChange}
          />
        </label>
      </form>

      {isLoading && <Loader />}
      {error && <p>Oops, some error occurred... {error}</p>}
      <ul>
        {showContacts &&
          contacts
            .filter(contact => {
              return contact.name.toLowerCase().includes(filter.toLowerCase());
            })
            .map(contact => {
              return (
                <li key={contact.id}>
                  <h3>Name: {contact.name}</h3>
                  <p>Number: {contact.number}</p>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    type="button"
                    aria-label="Delete contact"
                  >
                    &times;
                  </button>
                </li>
              );
            })}
      </ul>
    </ContactsSyled>
  );
};

export default Contacts;
