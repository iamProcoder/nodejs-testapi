const express = require('express');
const router = express.Router();

//Models
const Movie = require('../models/Movie')

router.get('/', (req, res, next) => {
  res.json({status: 1});
});

router.post('/', (req, res, next) => {
  //***** AŞAĞIDAKİ 2 KULLANIMDA GEÇERLİ İLKİ UZUN İKİNCİSİ KISA KULLANIM *****/
  //(1)
  // const {title, imdb, country, category, year} = req.body;
  // const movie = new Movie({
  //   title: title,
  //   imdb: imdb,
  //   country: country,
  //   category: category,
  //   year: year
  // });

  //(2)
  const movie = new Movie(req.body);
  
  //(1)
  // movie.save((err, result) => {
  //   if (err)
  //     res.sendStatus(500).send({ message: err });

  //   res.status(201).json(result);
  // });

  //(2)
  const movieSave = movie.save();
  movieSave.then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.sendStatus(500).send({ message: err });
    });

});



module.exports = router;
