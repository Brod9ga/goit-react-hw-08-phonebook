import React from 'react';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Loader } from './Loader/Loader';

export const App = () => {
  return (
    <div>
      <h1>Phonеbook</h1>
      
      <ContactForm />

      <h2>Contacts</h2>

      <Filter />

      <Loader />

      <ContactList />
    </div>
  );
};
