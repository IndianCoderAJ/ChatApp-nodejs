import React, { useState, useEffect } from 'react';
import {Link} from'react-router-dom';
import './css/join.css';

const Join = () => {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');

    return(
    <React.Fragment>
      <div class="Login-main-container">
        <div class="card">
            <div class="card-body">
              <h5 class="card-title">Join Room</h5>
              <div class="form-group">
                <input
                 type="text"
                  className="form-control"
                   id="name"
                   name="name"
                   placeholder="Name"
                   onChange={(event) => setName(event.target.value)}
                  />
              </div>
              <div class="form-group">
                <input
                 type="text"
                  className="form-control"
                  id="roomid"
                  placeholder="Room ID"
                  name="roomid"
                  onChange={(event) => setRoom(event.target.value)}
                  />
              </div>
              <Link onClick ={event => (!name || !room)?event.preventDefault():null} to={`/chat?name=${name}&room=${room}`}>
                <button
                 type="submit"
                 className="btn btn-primary">
                   SingIn
                  </button>
                </Link>
            </div>
          </div>
    </div>

    </React.Fragment>
    )
};

export default Join;