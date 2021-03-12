const db = require(`./database`);

const {
  Artist,
  Song,
  Student,
  SongDetail,
  ListeningDetail,
} = require('./models/index.js');

Artist.hasMany(Song);
Song.belongsTo(Artist);

Song.belongsToMany(Student, { through: SongDetail });
Student.hasMany(SongDetail);

// Song.belongsToMany(Student, { through: ListeningDetail });
// Student.hasMany(ListeningDetail);

module.exports = {
  db,
  Artist,
  Song,
  Student,
  SongDetail,
  ListeningDetail,
};
