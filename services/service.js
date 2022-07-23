const connection = require("../dbConfig");
module.exports = {
  query: (query, fields) => {
    return new Promise((resolve, reject) => {
      connection.query(query, fields, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },
};
