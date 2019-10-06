const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

// Models
const Director = require('../models/Director');

router.post('/', (req, res) => {
  const director = new Director(req.body);
  const saveDirector = director.save();
  saveDirector.then(result => {
    res.status(201).json(result);
  })
  .catch(err => {
    res.status(500).json({ message: err });
  });
});

router.get('/', (req, res) => {
  const directors = Director.aggregate([ //director_id ye bağlı filmler geliyor.. aggregate ile include yapmış oluyoruz    
    {
      $lookup: { //include
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movie'
      }
    },
    {
      $unwind: {
        path: '$movie',
        preserveNullAndEmptyArrays: true // filmler de director_id si uymayan yani filmi olmayanlarda gelmesini sağlyor
      }
    },
    {
      $group: {
        _id: { // _id ye göre grupluyoruz director ü
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: { 
          $push: '$movie' // ve tüm fimlleri yeni yazdığımız movies adlı değişkene ekliyoruz
        }
      }
    },
    {
      $project: { // istediğimiz alanların gelmesini sağlıyoruz
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        movies: '$movies' // grupta verdiğimiz movies değişkenini de gelmesini istediğimiz alan olarak ekliyoruz
      }
    }
  ]);

  directors.then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    res.status(500).json({ message: err });
  });
});

router.get('/:director_id', (req, res) => {
  const directors = Director.aggregate([ //director_id ye bağlı filmler geliyor.. aggregate ile include yapmış oluyoruz    
    {
      $match: { // belli bir parametreye göre alanları döndür. yani aggregate fonksiyonunun parametreli hali
        '_id': mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup: { //include
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movie'
      }
    },
    {
      $unwind: {
        path: '$movie',
        preserveNullAndEmptyArrays: true // filmler de director_id si uymayan yani filmi olmayanlarda gelmesini sağlyor
      }
    },
    {
      $group: {
        _id: { // _id ye göre grupluyoruz director ü
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: { 
          $push: '$movie' // ve tüm fimlleri yeni yazdığımız movies adlı değişkene ekliyoruz
        }
      }
    },
    {
      $project: { // istediğimiz alanların gelmesini sağlıyoruz
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        movies: '$movies' // grupta verdiğimiz movies değişkenini de gelmesini istediğimiz alan olarak ekliyoruz
      }
    }
  ]);

  directors.then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    res.status(500).json({ message: err });
  });
});

router.put('/:director_id', (req, res, next) => {
  const director = Director.findByIdAndUpdate(req.params.director_id, req.body, { new: true });
  director.then(result => {
    if (!result)
      next({ message: 'director not found', code: 404 });
    res.status(200).json(result);
  })
    .catch(err => res.status(500).json({ message: err }));
});

router.delete('/:director_id', (req, res, next) => {
  const director = Director.remove({_id: req.params.director_id});
  director.then(result => {
    if (!result)
      next({ message: 'director not found', code: 404 });
    res.status(200).json({message: 'director deleted'});
  })
    .catch(err => res.status(500).json({ message: err }));
});


module.exports = router;
