// @ts-ignore
const admin = require('firebase-admin');

admin.initializeApp();

// @ts-ignore
const db = admin.firestore();

module.exports = { admin, db };
