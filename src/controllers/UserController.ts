import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

import User from '../models/User';

class UserController {
  public index(req: Request, res: Response) {
    return res.send({ userId: req.userId });
  }

  public async create(req: Request, res: Response) {
    const repository = getRepository(User);

    const { email, password } = req.body;

    const userExists = await repository.findOne({ email });

    if (userExists) {
      return res.status(409).send('conflict');
    }

    const user = repository.create({
      email,
      password,
    });

    await repository.save(user);

    return res.json(user);
  }
}

export default new UserController();
