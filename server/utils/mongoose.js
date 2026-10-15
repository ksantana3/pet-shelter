const mongoose = require("mongoose");

module.exports = (DB_NAME) => {
    // Set MONGODB_URI to point at a different MongoDB instance; defaults to a local one.
    const uri = process.env.MONGODB_URI || `mongodb://localhost/${DB_NAME}`;
    mongoose.connect(uri);
    require ('../models/pet');
}
