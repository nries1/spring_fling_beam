const Sequelize = require('sequelize');
const db = require('../database.js');

const { UUID, UUIDV4, STRING, INTEGER } = Sequelize;

const Student = db.define('Student', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  firstName: {
    type: STRING,
  },
  lastName: {
    type: STRING,
  },
  spotifyId: {
    type: INTEGER,
  },
});

module.exports = Student;
