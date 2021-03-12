const router = require('express').Router();
const Sequelize = require('sequelize');
const { ListeningDetail, Song, Artist } = require('../../db');
const { sendError } = require('../utils.js');

const DB = new Sequelize('postgres://localhost:5432/springFling');

// returns all most popular songs between two dates
router.get('/songs/between/all', async (req, res) => {
  let { startDate, endDate } = req.body;
  startDate = new Date(startDate).toISOString();
  endDate = new Date(endDate).toISOString();
  const songStreams = await DB.query(
    `
    SELECT s.name AS song, a.name AS artist, SUM(l.streams) AS total_streams FROM
    public."listeningDetails" AS l
    JOIN public."Songs" AS s
    ON s.id = l."SongId"
    JOIN public."Artists" AS a
    ON s."ArtistId" = a.id
    WHERE l.timestamp BETWEEN :startDate AND :endDate
    GROUP BY s.name, a.name
    `,
    {
      replacements: { startDate, endDate },
      type: Sequelize.QueryTypes.SELECT,
    }
  );
  return res.status(200).send(songStreams);
});

// returns most popular n songs between two dates.
router.get('/songs/between/:n', async (req, res) => {
  let {
    body: { startDate, endDate },
    params: { n },
  } = req;
  startDate = new Date(startDate).toISOString();
  endDate = new Date(endDate).toISOString();
  const songStreams = await DB.query(
    `
    SELECT s.name AS song, a.name AS artist, SUM(l.streams) AS total_streams FROM
    public."listeningDetails" AS l
    JOIN public."Songs" AS s
    ON s.id = l."SongId"
    JOIN public."Artists" AS a
    ON s."ArtistId" = a.id
    WHERE l.timestamp BETWEEN :startDate AND :endDate
    GROUP BY s.name, a.name
    LIMIT :n
    `,
    {
      replacements: { startDate, endDate, n: +n },
      type: Sequelize.QueryTypes.SELECT,
    }
  );
  return res.status(200).send(songStreams);
});

module.exports = router;
