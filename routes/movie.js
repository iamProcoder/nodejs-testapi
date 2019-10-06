const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Models
const Movie = require('../models/Movie')

router.get('/', (req, res) => {
  const movieList = Movie.find({}).sort({'year': 1}); //yıla göre küçükten büyüğe göre yapıyor. eğer büyükten küçük için olacaksa -1 verilecek
  movieList.then(result => {
    res.status(200).json(result);
  })
    .catch(err => res.sendStatus(500).send({ message: err }));
});

//top 10 list
router.get('/top10', (req, res) => {
  const movieList = Movie.find({}).limit(10).sort({ 'imdb': -1 });
  movieList.then(result => {
    res.status(200).json(result);
  })
    .catch(err => res.sendStatus(500).send({ message: err }));
});

//between
router.get('/between/:start_year/:end_year', (req, res) => {
  //$gte => büyük yada eşit anlamında
  //$lte => küçük yada eşit anlamında
  const { start_year, end_year } = req.params; 
  const movieList = Movie.find({
    year: { "$gte": Number(start_year), "$lte": Number(end_year) }
  });

  movieList.then(result => {
    res.status(200).json(result);
  })
    .catch(err => res.sendStatus(500).send({ message: err }));
});

router.get('/:movie_id', (req, res, next) => {
  const movieList = Movie.findById(req.params.movie_id);
  movieList.then(result => {
    if (!result)
      next({ message: 'movie not found', code: 404 });
    res.status(200).json(result);
  })
    .catch(err => res.sendStatus(500).send({ message: err }));
});

router.put('/:movie_id', (req, res, next) => {
  const movie = Movie.findByIdAndUpdate(req.params.movie_id, req.body, { new: true });
  movie.then(result => {
    if (!result)
      next({ message: 'movie not found', code: 404 });
    res.status(200).json(result);
  })
    .catch(err => res.sendStatus(500).send({ message: err }));
});

router.delete('/:movie_id', (req, res, next) => {
  //(1) bu yöntem önce gönderilen id ile veriyi buluyo sonrasında siliyor
  // const movie = Movie.findByIdAndRemove(req.params.movie_id);

  //(2) bu yöntem ise direk id üzerinden siliyor sadece tablonun id isini direk siliyor
  const movie = Movie.remove({_id: req.params.movie_id});

  movie.then(result => {
    if (!result)
      next({ message: 'movie not found', code: 404 });
    res.status(200).json({message: 'movie deleted'});
  })
    .catch(err => res.sendStatus(500).send({ message: err }));
});

router.post('/', (req, res) => {
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
