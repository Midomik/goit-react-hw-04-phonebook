import { useEffect, useState } from 'react';
import { Form } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { SearchContact } from './SearchContact/SearchContact';

import css from './App.module.css';
import { nanoid } from 'nanoid';

export const App = () => {
  const INITIAL_STATE = {
    contacts: [
      { name: 'Vasil', number: '+380123456789', id: nanoid() },
      { name: 'Stepan', number: '+382342348737', id: nanoid() },
      { name: 'Oleh', number: '+382634174942', id: nanoid() },
    ],
    filter: '',
  };
  // state = { ...this.INITIAL_STATE };
  const [contacts, setContacts] = useState([...INITIAL_STATE.contacts]);
  const [filter, setFilter] = useState(INITIAL_STATE.filter);

  const addToContact = item => {
    let isInList = contacts.some(
      itemContact =>
        itemContact.name.toLocaleLowerCase() === item.name.toLocaleLowerCase()
    );

    isInList
      ? alert(`${item.name} is already in contacts!`)
      : setContacts([...contacts, { ...item, id: nanoid() }]);
  };
  const filterContact = searchWords => {
    setFilter(searchWords);
  };
  const removeItem = id => {
    setContacts(contacts.filter(item => item.id !== id));
    console.log(id);
  };
  const visibleContacts = () => {
    const newContacts = contacts.filter(item =>
      item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );

    return filter === '' ? contacts : newContacts;
  };
  // componentDidMount() {
  //   const stringifiedContacts = localStorage.getItem('contacts');
  //   const parseContacts =
  //     JSON.parse(stringifiedContacts) ?? this.INITIAL_STATE.contacts;
  //   this.setState({ contacts: parseContacts });
  // }

  useEffect(() => {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parseContacts =
      JSON.parse(stringifiedContacts) ?? INITIAL_STATE.contacts;

    setContacts(parseContacts);
  }, []);

  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);

  // componentDidUpdate(_, prevState) {
  //   if (prevState.contacts !== this.state.contacts) {
  //     const stringifiedContacts = JSON.stringify(this.state.contacts);
  //     localStorage.setItem('contacts', stringifiedContacts);
  //   }
  // }

  return (
    <div className={css.main_container}>
      <Form addToContact={addToContact} />
      <SearchContact value={filter} filterContact={filterContact} />
      <ContactList contacts={visibleContacts()} removeItem={removeItem} />
    </div>
  );
};
