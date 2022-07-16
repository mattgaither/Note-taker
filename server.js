const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require("./Develop/routes/apiRoutes.js");
const htmlRoutes = require("./Develop/routes/htmlRoutes.js");
const {notes} = require('./Develop/db/db.json')


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


app.use('/', htmlRoutes);
app.use('/api', apiRoutes);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

