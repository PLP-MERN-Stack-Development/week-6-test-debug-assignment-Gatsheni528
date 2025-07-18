const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Bug = require('../models/Bug');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/mern-bug-tracker-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Bug.deleteMany(); // Clean test data
});

describe('Bug API', () => {
  it('should create a new bug', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .send({
        title: 'Sample Bug',
        description: 'This is a bug',
        status: 'open',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Sample Bug');
  });

  it('should not create bug without title', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .send({
        description: 'Missing title',
        status: 'open',
      });
    expect(res.statusCode).toBe(400);
  });

  it('should fetch all bugs', async () => {
    await Bug.create({ title: 'Bug A', description: 'desc', status: 'open' });
    const res = await request(app).get('/api/bugs');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a bug status', async () => {
    const bug = await Bug.create({ title: 'Bug to update', description: 'desc', status: 'open' });
    const res = await request(app)
      .put(`/api/bugs/${bug._id}`)
      .send({ status: 'resolved' });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('resolved');
  });

  it('should delete a bug', async () => {
    const bug = await Bug.create({ title: 'Bug to delete', description: 'desc', status: 'open' });
    const res = await request(app).delete(`/api/bugs/${bug._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });
});
