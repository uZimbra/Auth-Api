import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import authSecret from '../auth/authSecret';

import User from '../models/User';

class AuthController {
  public async authenticate(req: Request, res: Response) {
    const repository = getRepository(User);

    const { email, password } = req.body;

    const user = await repository.findOne({ email });

    if (!user) {
      return res.status(409).send();
    }

    const solvedPassword = bcrypt.compareSync(password, user.password);

    if (!solvedPassword) {
      return res.status(409).send();
    }

    const token = jwt.sign({ id: user.id }, authSecret.secret, {
      expiresIn: '1d',
    });

    delete user.password;

    return res.send({
      user,
      token,
    });
  }
}

export default new AuthController();
