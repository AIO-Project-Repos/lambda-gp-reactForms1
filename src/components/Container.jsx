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
    // we have the new value for the input inside e.target.value
    setFriendForm({ name: e.target.value, age: friendForm.age });
  };

  const onAgeChange = e => {
    // we have the new value for the input inside e.target.value
    setFriendForm({ name: friendForm.name, age: e.target.value });
  };

  return (
    <div className='container-hello-world'>
      <Form
        onNameChange={onNameChange}
        onAgeChange={onAgeChange}
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

  return (
    <form>
      <label htmlFor='nameInput'>Name</label>
      <input id='nameInput' type='text' />

      <label htmlFor='ageInput'>Age</label>
      <input id='ageInput' type='text' />

      <button
        disabled={false}
        onClick={e => e.preventDefault()}
      >
        submit
      </button>
    </form>
  );
}
