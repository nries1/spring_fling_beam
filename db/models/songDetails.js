const Sequelize = require('sequelize');
const db = require('./../database.js');

const { UUID, UUIDV4, INTEGER } = Sequelize;

const SongDetail = db.define(`SongDetail`, {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  streams: {
    type: INTEGER,
  },
  // Student ID FK added in DB relationship definition (db/index.js)
  // Song ID FK added in DB relationship definition (db/index.js)
});

module.exports = SongDetail;
