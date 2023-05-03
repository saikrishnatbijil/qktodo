// import React, { useState } from 'react'
import './space.css'
import { db } from '../../../firebase/firebase-config';
import { collection, onSnapshot, query } from 'firebase/firestore';

function space({ spaces }) {
  // const [reload, setReload] = React.useState(0);
  // const [space, setSpace] = useState([]);

  const spacesItem = ({ key, space }) => {
    return (
      <div className="spaceItem">
        <p>{space.name}</p>
      </div>
    )
  }

  const Items = spaces.map((space) => {
    return (
      <spacesItem key={space.id} space={space} />
    );
  });

  return (
    <div className='spacemenuCon'>
      <Items />
    </div>
  )
}

export default space