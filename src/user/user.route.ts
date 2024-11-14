import { Router } from 'express';
import { universities, users } from '../data.ts';

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.json(users);
});

userRouter.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

userRouter.post('/', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    uniId: req.body.uniId,
    subjects: req.body.subjects,
  };
  users.push(newUser);
  res.status(201).json(newUser);
  });

// PUT to update an existing user
userRouter.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = {
      id: userId,
      name: req.body.name,
      email: req.body.email,
      uniId: req.body.uniId,
      subjects: req.body.subjects,
    };

    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE a user by ID
userRouter.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);

  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

userRouter.patch('/:id/subjects', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if(userIndex === -1) {
    res.status(404).json({ message: 'User not found' });
  }
  users[userIndex].subjects = req.body.subjects;
  res.json(users[userIndex]);
});

userRouter.patch('/:id/update-university', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if(userIndex === -1) {
    res.status(404).json({ message: 'User not found' });
  }
  const uniId = parseInt(req.body.uniId);
  const uniIndex = universities.findIndex((u) => u.uniId === uniId);
  if(userIndex === -1){
    res.status(404).json({ message: 'Uni not found' });
  }

  users[userIndex].uniId = uniId;
  res.json(users[userIndex]);
});

export default userRouter;
