const router = require('express').Router();
const {
  SongDetail,
  Student,
  Artist,
  Song,
  ListeningDetail,
} = require('../../db');
const { sendError } = require('../utils.js');

router.put('/student', async (req, res) => {
  const { user_id, songs } = req.body;
  const student = await Student.findOne({ where: { spotifyId: user_id } });
  if (!student)
    return sendError(
      res,
      404,
      'Could not find a student with the provided Spotify ID'
    );
  // streamsToDate will update to include all ytd streams by student-song combination
  let streamsToDate = 0;
  try {
    for (const song of songs) {
      let artist = await Artist.findOne({ where: { name: song.artist } });
      if (!artist) artist = await Artist.create({ name: song.artist });
      //   since songs can share names, we find songs based on artist name and song name, but that is imperfect because artists can share names as well
      let songRow = await Song.findOne({
        where: { name: song.title, ArtistId: artist.id },
      });
      if (!songRow)
        songRow = await Song.create({ name: song.title, ArtistId: artist.id });
      let currentSongDetail = await SongDetail.findOne({
        where: { StudentId: student.id, SongId: songRow.id },
      });
      if (currentSongDetail) {
        // store previous YTD strems to subtract out of streams for current timestamp
        streamsToDate = currentSongDetail.streams;
        await currentSongDetail.update({ streams: song.total_streams });
      } else {
        await SongDetail.create({
          SongId: songRow.id,
          StudentId: student.id,
          streams: song.total_streams,
        });
      }
      await ListeningDetail.create({
        SongId: songRow.id,
        StudentId: student.id,
        ArtistId: artist.id,
        streams: song.total_streams - streamsToDate,
        timestamp: new Date(song.timestamp).toISOString(),
      });
    }
  } catch (e) {
    console.log(e);
    return sendError(res, 500, e);
  }
  return res.status(200).send('Streaming information updated.');
});

module.exports = router;
