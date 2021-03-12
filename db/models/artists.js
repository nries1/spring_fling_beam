const Sequelize = require('sequelize');
const db = require('../database.js');

const { UUID, UUIDV4, STRING } = Sequelize;

const Artist = db.define('Artist', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
  },
});

module.exports = Artist;
