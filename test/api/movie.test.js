const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let TOKEN;

describe('[::::::::::> /api/movies tests <::::::::::]', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({ username: 'deneme', password: '12345' })
            .end((err, res) => {
                if (err)
                    throw err;

                TOKEN = res.body.token;
                done();
            });
    });

    describe('/GET movies', () => {
        it('it should GET all the movies', (done) => {
            chai.request(server)
                .get('/api/movie')
                .set('x-access-token', TOKEN)
                .end((err, res) => {
                    if (err) throw err;
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST movie', (done) => {
        it('it should POST a the movies', (done) => {
            const movie = {
                title: 'test movie data2',
                director_id: '5d9a23d0b1d1f70744ed66f0',
                category: 'test category2',
                country: 'test country2',
                year: 1999,
                imdb: 10
            }
            chai.request(server)
            .post('/api/movie')
            .send(movie)
            .set('x-access-token', TOKEN)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('director_id');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb');
                done();
            });
        });        
    });

});