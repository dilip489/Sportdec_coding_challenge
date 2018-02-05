let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);
    
describe('/search', () => {
    it('it should search for projects in github & tweets mentioning the project name', (done) => {
      chai.request('http://localhost:8000/')
          .get('search?q=football')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
            done();
          });
    }).timeout(10000);;
});
