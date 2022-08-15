// import {compose, createStore, applyMiddleware} from "redux";
import logger from "redux-logger";
import { compose } from "redux";
import { createStore } from "redux";


// function fetchUsers(url, callback) {
//   setTimeout(
//     () =>
//       callback([
//         { name: "John", id: 1 },
//         { name: "Doe", id: 2 }
//       ]),
//     100
//   );
// }

// function getUsers(callback) {
//   fetchUsers("/api/v1/users", callback);
// }

// function logUsers() {
//   getUsers(res => console.log("Users are: ", res));
// }

// logUsers();