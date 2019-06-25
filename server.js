const express = require("express"),
         cors = require("cors"),
          app = express(),
       DB_NAME = "petdb"
         port = 8000,
           bp = require("body-parser");

app.use(cors());
app.use(bp.json({limit: '1mb'}));
// TODO: Express Static

require("./server/utils/mongoose")(DB_NAME);
require("./server/utils/routes")(app)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});