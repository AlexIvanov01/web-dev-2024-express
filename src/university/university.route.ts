import { Router } from 'express';
import { universities } from '../data.ts';

const uniRouter = Router();



uniRouter.get('/', (req, res) => {
    res.json(universities);
});

uniRouter.get('/:id', (req, res) => {
  const uniId = parseInt(req.params.id);
  const uni = universities.find((u) => u.uniId === uniId);
  if (uni) {
    res.json(uni);
  } else {
    res.status(404).json({ message: 'University not found' });
  }
});

uniRouter.post('/', (req, res) => {
  const newUni = {
    uniId: universities.length + 1,
    name: req.body.name,
  };
  universities.push(newUni);

  res.status(201).json(newUni);
});

// PUT to update an existing uni
uniRouter.put('/:id', (req, res) => {
  const uniId = parseInt(req.params.id);
  const uniIndex = universities.findIndex((u) => u.uniId === uniId);
  if (uniIndex !== -1) {
    universities[uniIndex] = {
      uniId: uniId,
      name: req.body.name,
    };

    res.json(universities[uniIndex]);
  } else {
    res.status(404).json({ message: 'Uni not found' });
  }
});

// DELETE a uni by ID
uniRouter.delete('/:id', (req, res) => {
  const uniId = parseInt(req.params.id);
  const uniIndex = universities.findIndex((u) => u.uniId === uniId);
  if (uniId !== -1) {
    const deletedUni = universities.splice(uniIndex, 1);
    res.json(deletedUni[0]);
  } else {
    res.status(404).json({ message: 'Uni not found' });
  }
});

export default uniRouter;