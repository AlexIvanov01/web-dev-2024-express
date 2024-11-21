import express, { Request, Response } from 'express';
import { db } from '../database';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, universityId, subjects } = req.body;
    const university = await db.models.University.findByPk(universityId); 

    if (!university) {
      res.status(404).json({ error: 'University not found' });
      return;
    }

    if (await db.models.User.findOne({ where: { email } })) {
      throw new Error("User already exists.")
    }

    const user = await db.models.User.create({ name, email, universityId, subjects });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (_req: Request,  res: Response) => {
  try {
    const users = await db.models.User.findAll({
      include: {
        model: db.models.University,
        as: 'university',
      },
    });
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/subjects', async (req: Request, res: Response) => {
  try {
    const { email, subjects } = req.body;

    let User = await db.models.User.findOne({ where: {email}});

    if(!User){
      throw new Error("User doesnt exists.")
    }
    
    User.setSubjects(subjects);
    
    await db.models.User.update({subjects: subjects} , { where: {email}});

  }catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
