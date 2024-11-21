import express, { Request, Response } from 'express';
import { db } from '../database';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, users}  = req.body;
    const subjectCheck = await db.models.Subject.findOne({ where: name}); 

    if (subjectCheck) {
      res.status(404).json({ error: 'Subject already exists' });
      return;
    }
    
    const subject = await db.models.Subject.create({ name, users });
    res.status(201).json(subject);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
