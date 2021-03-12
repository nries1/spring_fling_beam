const Sequelize = require('sequelize');
const db = require('./../database.js');
const Song = require('./songs.js');
const Student = require('./students.js');

const { UUID, UUIDV4, INTEGER, DATE } = Sequelize;

const ListeningDetail = db.define('listeningDetail', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  streams: {
    type: INTEGER,
  },
  timestamp: {
    type: DATE,
  },
  SongId: {
    type: UUID,
    references: {
      model: Song,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  StudentId: {
    type: UUID,
    references: {
      model: Student,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  // Student ID FK added in DB relationship definition (db/index.js)
  // Song ID FK added in DB relationship definition (db/index.js)
});

module.exports = ListeningDetail;
