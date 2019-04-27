import app from '../../src/server.js';
import request from 'supertest';

// describe('GET routes', () => {
//     it('should response the GET method', async () => {
//         const res = await request(app).get('/denuncias');
//         expect(res).to.have.status(200);
//         done();
//     });
// });

describe('GET routes', () => {

    it('should response the GET method', (done) => {
        request(app)
            .get('/denuncias')
            .expect(200)
            .end(function (err) {
                if (err) return done(err);
                done();
            });
    });
});