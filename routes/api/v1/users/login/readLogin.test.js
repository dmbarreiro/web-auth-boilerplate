"use strict";

const appRoot = require('app-root-path');
const app = require(appRoot + '/app.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const envVar = require(appRoot + '/config/environment/variables');
// Load User model
const User = require(appRoot + '/models/database/User');
const mongoose = require('mongoose');

chai.use(chaiHttp);

describe('readLogin', () => {
    before((done) => {
        done()
    });
    after((done) => {
        //app.close();
        done();
    })
    beforeEach((done) => {
        // User.deleteMany({}, (err) => {
        //     done();
        // });
        done();
    });

    describe('/GET /api/v1/users/login', () => {
        it('should return HTTP status 200', async () => {
            try {
                const res = await chai.request(app).get('/api/v1/users/login');
                res.should.have.status(200);
            } catch(error) {
                throw error;
            }
            
        });
    });

    
});

