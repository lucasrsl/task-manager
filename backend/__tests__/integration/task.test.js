import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/app';

let token = '';
let user = {};
let task = {};

beforeAll(async () => {
    mongoose.connect(
        'mongodb+srv://ricardo:ricardo@hubtec-test-sxnej.mongodb.net/test?retryWrites=true&w=majority',
        { 
          useNewUrlParser: true,
          useFindAndModify: true,
          useUnifiedTopology: true,
        },
      );
      const response = await request(app)
        .post('/session')
        .send({
            email: 'test1@test.com',
            password: '12345678',
        });
        user = response.body.user;
        token = response.body.token;        
});

describe('Create', () => {
    it('should be able to create a task', async () => {
        const response = await request(app)
            .post('/task')
            .set('Authorization', 'Bearer ' + token)
            .send({
                title: 'task1',
                description: 'task test 1',
                user: user._id,
                deadLine: '2020-01-10T17:28:25.595Z',
            });
        task = response.body;

        expect(response.body).toHaveProperty('_id');
    });
});

describe('List', () => {
    it('should be able to list all tasks', async () => {
        const response = await request(app)
            .get('/task')
            .set('Authorization', 'Bearer ' + token);
        
        expect(response.body.toDo[0].deletedAt).toBe(null);
    });
});

describe('Update', () => {
    it('should be able to update a task', async () => {
        const response = await request(app)
            .put('/task/' + task._id)
            .set('Authorization', 'Bearer ' + token)
            .send({
                title: task.title,
                description: task.description,
                user: task.user,
                deadLine: task.deadLine,
                status: 'doing',
            });

        expect(response.body.status).toBe('doing');
    });
});

describe('Soft Delete', () => {
    it('should be able to soft delete a task', async () => {
        const response = await request(app)
            .delete('/task/' + task._id)
            .set('Authorization', 'Bearer ' + token);
                 
        expect(response.status).toBe(200);
    });
});
