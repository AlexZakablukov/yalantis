import React, { useState, useEffect } from "react";
import axios from 'axios';
import moment from "moment";
import './App.css';

const USERS_ENDPOINT = "https://yalantis-react-school-api.yalantis.com/api/task0/users";

const months = moment.months();
console.log(months);

const App = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const filterUsers = (users) => {
    const filteredUsers = {};
    months.forEach((month, index) => {
      filteredUsers[month] = users.filter(user => {
        return moment(user.dob).month() === index
      })
    });
    return filteredUsers
  };

  useEffect(() => {
    setLoading(true);

    axios.get(USERS_ENDPOINT)
      .then(function ({data}) {
        setUsers(filterUsers(data));
        console.log(filterUsers(data));

        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });

  }, []);


  return (
    <div className="App">
      <ul>
        {Object.keys(users).map((month, index) => (
          <li key={index}>
            {month}
          </li>
        ))}
      </ul>
      {/*{loading ? "loading" : (*/}
      {/*  <ul>*/}
      {/*    {users.map(({id, firstName, lastName, dob}) => (*/}
      {/*      <li key={id}>*/}
      {/*        {moment(dob).month()}*/}
      {/*      </li>*/}
      {/*    ))}*/}
      {/*  </ul>*/}
      {/*)}*/}
    </div>
  );
};

export default App;
