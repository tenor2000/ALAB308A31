// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

console.time("Overall Time");

function getUserData(id) {
  console.time("Request time for ID " + id);
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  const dbData = central(id).then((retrievedDbName) => {
    return getFromDb(retrievedDbName);
  });
  const vaultData = vault(id);

  return Promise.all([dbData, vaultData])
    .then(([dbObj, vaultObj]) => {
      console.timeEnd("Request time for ID " + id);
      return {
        id: id,
        name: vaultObj.name,
        username: dbObj.username,
        email: vaultObj.email,
        address: vaultObj.address,
        phone: vaultObj.phone,
        website: dbObj.website,
        company: dbObj.company,
      };
    })
    .catch((error) => {
      console.log(error);
      console.timeEnd("Overall time for ID " + id);
      return "Error";
    });

  // helper function
  function getFromDb(dbName) {
    return dbs[dbName](id).then((data) => ({
      username: data.username,
      website: data.website,
      company: data.company,
    }));
  }
}

const usersQuery = [
  getUserData(1),
  getUserData(2),
  getUserData(3),
  getUserData(4),
  getUserData(5),
  getUserData(6),
  getUserData(7),
  getUserData(8),
  getUserData(9),
  getUserData(10),
  getUserData(true),
  getUserData(11),
];
const userData = await Promise.all(usersQuery).then((results) => {
  return results;
});

const app = document.getElementById("app");
const timer = document.createElement("h2");
timer.textContent = "Check console for times stamps";
app.appendChild(timer);

userData.forEach((person) => {
  const pre = document.createElement("pre");
  pre.textContent = JSON.stringify(person, null, 2);
  app.appendChild(pre);
});

console.timeEnd("Overall Time");
