import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/app';
import User from '../../src/models/User';

let token = '';

beforeAll(async () => {
    mongoose.connect(
        'mongodb+srv://ricardo:ricardo@hubtec-test-sxnej.mongodb.net/test?retryWrites=true&w=majority',
        { 
          useNewUrlParser: true,
          useFindAndModify: true,
          useUnifiedTopology: true,
        },
      );
});

describe('Sign Up', () => {
    it('should be able to register', async () => {
        const response = await request(app)
            .post('/user')
            .send({
                name: 'Test 1',
                email: 'test@test.com',
                password: '12345678',
            });
            
        await User.deleteOne({ _id: response.body._id });
        expect(response.body).toHaveProperty('_id');
    });

    it('should not be able to register with duplicated email', async () => {
        const response = await request(app)
        .post('/user')
        .send({
            name: 'Test 1',
            email: 'test1@test.com',
            password: '12345678',
        });
        
        expect(response.status).toBe(400);
    });

});

describe('Sign In', () => {
    it('should be able to sign in', async () => {
        const response = await request(app)
            .post('/session')
            .send({
                email: 'test1@test.com',
                password: '12345678',
            });
            
        token = response.body.token;

        expect(response.body.user.email).toBe('test1@test.com');
        expect(response.body.user.name).toBe('Test 1');
    });

});

describe('Sign Out', () => {
    it('should be able to sign out', async () => {
        const response = await request(app)
            .delete('/session')
            .set('Authorization', 'Bearer ' + token);
                         
        expect(response.status).toBe(200);
    });

});