"use strict";

var Firebase = require("firebase");

var firebaseUtils = {
    baseRef: new Firebase(`https://${FIREBASE_NAME}.firebaseio.com/`)
};

module.exports = firebaseUtils;
