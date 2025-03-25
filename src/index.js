// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

console.time("timer");

function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  return central(id)
    .then((retrievedDbName) => {
      return getFromDb(retrievedDbName);
    })
    .then((retrievedPersonData) => {
      return getFromVault(retrievedPersonData);
    })
    .catch((error) => {
      console.log("Error: ", error);
      return null;
    });

  // helper functions
  function getFromDb(dbName) {
    switch (dbName) {
      case "db1":
        return db1(id).then((data) => ({
          username: data.username,
          website: data.website,
          company: data.company,
        }));
      case "db2":
        return db2(id).then((data) => ({
          username: data.username,
          website: data.website,
          company: data.company,
        }));
      case "db3":
        return db3(id).then((data) => ({
          username: data.username,
          website: data.website,
          company: data.company,
        }));
      default:
        throw new Error("database not found");
    }
  }

  function getFromVault(dbObj) {
    return vault(id).then((vaultObj) => {
      const finalObject = {
        id: id,
        name: vaultObj.name,
        username: dbObj.username,
        email: vaultObj.email,
        address: vaultObj.address,
        phone: vaultObj.phone,
        website: dbObj.website,
        company: dbObj.company,
      };

      return finalObject;
    });
  }
}

const usersQuery = [
  getUserData(1),
  getUserData(2),
  getUserData(3),
  getUserData(6),
  getUserData(7),
  getUserData(8),
  getUserData(9),
];
const userData = await Promise.all(usersQuery).then((results) => {
  return results;
});

userData.forEach((person) => {
  console.log(person);
});

console.timeEnd("timer");
