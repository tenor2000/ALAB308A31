// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

console.time("Overall");

function getUserData(id) {
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
      console.log("Error: ", error);
      return null;
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

console.timeEnd("Overall");
