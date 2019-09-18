import React, { useState } from 'react';
import uuid from 'uuid';
import './Container.less';

const initialFriendsList = [
  // why is it useful to have a unique id?
  { id: uuid(), name: 'gabe', age: 42 },
  { id: uuid(), name: 'luke', age: 22 },
  { id: uuid(), name: 'josh', age: 52 },
];

const initialFriendForm = {
  name: '',
  age: '',
};

export default function Container() {
  // what state does this app need
  // in order to display friends,
  // and keep track of the state of the form?
  const [friendsList, setFriendsList] = useState(initialFriendsList);
  const [friendForm, setFriendForm] = useState(initialFriendForm);

  const onNameChange = e => {
    // we have the new value for the name input inside e.target.value
    setFriendForm({
      name: e.target.value,
      age: friendForm.age,
    });
  };

  const onAgeChange = e => {
    // we have the new value for the age input inside e.target.value
    setFriendForm({
      name: friendForm.name,
      age: e.target.value,
    });
  };

  const onFormSubmit = e => { // we DO need the event object
    e.preventDefault();
    const newFriend = {
      id: uuid(),
      name: friendForm.name,
      age: friendForm.age,
    };
    const newFriendsList = friendsList.concat(newFriend);
    setFriendsList(newFriendsList);
    setFriendForm(initialFriendForm);
  };

  return (
    <div className='container-hello-world'>
      <Form
        onNameChange={onNameChange}
        onAgeChange={onAgeChange}
        friendForm={friendForm}
        onFormSubmit={onFormSubmit}
      />
      {
        friendsList.map(friend => (
          <h5 key={friend.id}>
            {friend.name} is {friend.age} years old.
          </h5>
        ))
      }
    </div>
  );
}

function Form(props) {
  // what data does the form need to populate itself?
  // what callbacks does the form need to perform
  // its basic functions of updating fields and submitting?
  const { onNameChange, onAgeChange, onFormSubmit } = props;
  const { name, age } = props.friendForm;
  const isDisabled = () => {
    if (!name || !age) {
      return true;
    }
    return false;
  };

  return (
    <form>
      <label htmlFor='nameInput'>Name</label>
      <input
        maxLength={50}
        value={name}
        onChange={onNameChange}
        id='nameInput'
        type='text'
      />

      <label htmlFor='ageInput'>Age</label>
      <input
        value={age}
        onChange={onAgeChange}
        id='ageInput'
        type='number'
      />

      <button
        disabled={isDisabled()}
        onClick={onFormSubmit}
      >
        submit
      </button>
    </form>
  );
}
