const Sequelize = require('sequelize');
const db = require('../database.js');

const { UUID, UUIDV4, STRING } = Sequelize;

const Song = db.define('Song', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
  },
});

module.exports = Song;
