const { db, Student, Artist, Song } = require('../db');
const { students, artists } = require('../db/dummyData.js');

const startDev = (app, PORT) => {
  console.log('Starting in dev mode');
  db.sync({ force: true })
    .then(() => {
      console.log('DB Synced');
      return seed();
    })
    .then(() => {
      console.log(`DB Seeded`);
    })
    .then(() =>
      app.listen(PORT, () => {
        console.log(`EXPRESS API LISTENING IN DEV MODE AT localhost:${PORT}`);
      })
    );
};

const seed = async () => {
  const newStudents = await Promise.all(
    students.map(student => Student.create(student))
  );
  const newArtists = await Promise.all(
    artists.map(({ name }) => Artist.create({ name }))
  );
  const newSongs = await Promise.all(
    artists.map((artist, i) => {
      const ArtistId = newArtists[i].id;
      const songs = artist.songs;
      return Promise.all(
        songs.map(song => Song.create({ name: song, ArtistId }))
      );
    })
  );
};

const logRequest = request => {
  const { method, url, body } = request;
  console.log(
    `received ${method} request at ${url} with ${JSON.stringify(body)}`
  );
};

const sendError = (response, status, message) => {
  return response.status(status).send(message);
};

module.exports = { startDev, logRequest, sendError };
