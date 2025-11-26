const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
let events = [];

router.post('/events', (req, res) => {
  const { eventName, data, location, description } = req.body;
  const newEvent = {
    id: uuidv4(),
    eventName,
    data,
    location,
    description,
    tags: []
    };
    events.push(newEvent);
    res.status(201).json(newEvent);
});