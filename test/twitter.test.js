let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);
    
describe('/search/tweets/', () => {
    it('it should search tweets based on the given query', (done) => {
      chai.request('http://localhost:8000/twitter/')
          .get('search/tweets?q=football&result_type=mixed&t_count=4')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
            done();
          });
    }).timeout(10000);;
});
