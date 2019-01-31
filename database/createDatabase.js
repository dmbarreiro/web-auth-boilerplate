
const mongoose = require('mongoose');

module.exports = (configFile) => {
    // MongoDb config
    const db = configFile.MongoURI;
    // Connect to MongoDb
    mongoose.connect(db, { useNewUrlParser: true })
        .then(() => {
            console.log('MongoDB connected...')
        })
        .catch( err => {
            console.log(error)
            process.exitCode = 1;
    });
};

