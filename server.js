const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require("./routes/apiRoutes.js");
const htmlRoutes = require("./routes/htmlRoutes.js");
const {notes} = require('./Develop/db/db.json');
const path = require('path');


app.use('/static', express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


app.use('/', htmlRoutes);
app.use('/api', apiRoutes);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

