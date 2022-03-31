import axios from 'axios';
import { useEffect, useState } from 'react';

function User() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState();
  const [emailError, setEmailError] = useState();
  const [usernameError, setUserError] = useState();
  const [status, setStatus] = useState(false);
  const checkEmail = () => {
    axios
      .get(`/users/checkemail/${email}`)
      .then((res) => {
        setEmailError(res.data.debug_data);
        setStatus(false);
      })
      .catch((error) => {
        console.log(error);
        setStatus(true);
      });
  };
  const checkUsername = () => {
    axios
      .get(`/users/checkusername/${username}`)
      .then((res) => {
        setUserError(res.data.debug_data);
        setStatus(false);
      })
      .catch((error) => {
        console.log(error);
        setStatus(true);
      });
  };
  const addUser = (event) => {
    setStatus(true);
    event.preventDefault();
    if (status) {
      let carObject = {
        email: event.target.email.value,
        password: event.target.password.value,
        dob: event.target.dob.value,
        username: event.target.username.value,
      };
      axios
        .post('/users', carObject)
        .then((res) => {
          console.log(res.data);
          setError(res.data.debug_data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="card-container">
      <h1>Registration Form</h1>
      <form onSubmit={addUser} className="box">
        <p className="error">{emailError}</p>
        <div className="cards">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="todo-user-input"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <button onClick={checkEmail}>Check email</button>
        </div>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="todo-user-input"
        />
        <input
          type="date"
          name="dob"
          placeholder="Enter DOB"
          className="todo-user-input"
        />
        <p className="error">{usernameError}</p>
        <div className="cards">
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            className="todo-user-input"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <button onClick={checkUsername}>Check Username</button>
        </div>
        <button>Register</button>
        {status ? <p className="error">{error}</p> : ''}
      </form>
    </div>
  );
}
export default User;
