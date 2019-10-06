const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/udemy', { useMongoClient: true });
// mongoose.connection.on('open', () => {
//   console.log("MongoDB: Connected");
// });
// mongoose.connection.on('error', (err) => {
//   console.log("MongoDB: Error", err);
// });

const dbURI =
  "mongodb+srv://faruk:123456Fm_@cluster0-5pfwg.mongodb.net/nodeTest";

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10,
  useNewUrlParser: true
};
 
mongoose.connect(dbURI, options)
  .then(() => {
    console.log("Database connection established!");
  })
  .catch(err => {
    console.log("Error connecting Database instance due to: ", err);
  });
