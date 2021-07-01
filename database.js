const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
const roleDB = new PouchDB('roles');
const userDB = new PouchDB('users');
const newsDB = new PouchDB('news');
const permissionDB = new PouchDB('permission');
roleDB.createIndex({
  index: {
    fields: ['id']
  }
})
userDB.createIndex({
  index: {
    fields: ['id']
  }
})
newsDB.createIndex({
  index: {
    fields: ['id']
  }
})
permissionDB.createIndex({
  index: {
    fields: ['id']
  }
})
module.exports = {roleDB, userDB, newsDB, permissionDB}
