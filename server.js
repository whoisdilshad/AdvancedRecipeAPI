const express = require('express');
const bodyParser = require('body-parser');
const {v4: uuidv4} = require('uuid');

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

let events =[];
app.post('/api/events', (req, res) => {
  const { eventName,data, location, description } = req.body;
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

app.put('/api/events/:id', (req, res) => {
    const { id } = req.params;
    const { eventName, data, location, description } = req.body;
    const event = events.find(event => event.id === id);
    if (event) {
        if (location) event.location = location;
        if (description) event.description = description;
        if (eventName) event.eventName = eventName;
        if (data) event.data = data;
        res.json(event);
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
});

app.delete('/api/events/:id', (req, res) => {
    const { id } = req.params;
    const eventIndex = events.findIndex(event => event.id === id);
    if (eventIndex !== -1) {
        events.splice(eventIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Event not found' });
    }       

});







app.get('/', (req, res) => {
  res.send('server is running');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
