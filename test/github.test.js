let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);
    
describe('/search/repositories/', () => {
    it('it should search all repositories in github', (done) => {
      chai.request('http://localhost:8000/github/')
          .get('search/repositories?searchq=football&language=node&sort=stars&order=desc')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
            done();
          });
    }).timeout(10000);;
});
