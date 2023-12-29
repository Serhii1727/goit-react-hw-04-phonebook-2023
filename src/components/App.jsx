import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import { nanoid } from 'nanoid';
import css from './App.module.css';

export function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = ({ name, number }) => {
    const isContactName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactName) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => {
      return [...prevContacts, { name, number, id: nanoid() }];
    });
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getFilterContacts = () => {
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizeFilter);
    });
  };

  const deleteContact = id => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== id);
    });
  };

  const visibleContacts = getFilterContacts();

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2 className={css.title}>Contacts</h2>
      <Filter changeFilter={changeFilter} />
      {contacts.length >= 0 && (
        <ContactList contacts={visibleContacts} onDelete={deleteContact} />
      )}
    </div>
  );
}
