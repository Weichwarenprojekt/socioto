import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /***
   * Returns a User object by the provided id parameter. Password and internal _id are not returned
   * for security reasons.
   * @param id
   */
  public async get(id: number): Promise<User> {
    const user = await this.userModel.findOne(
      { id },
      { hashedPassword: 0, _id: 0 },
    );

    if (!user) {
      throw new NotFoundException(null, `No user with id = ${id} was found`);
    }

    return user;
  }

  /***
   * Gets all authentication related info for a user identified by the username property
   * @param username
   */
  public getAuthInfo(username) {
    return this.userModel.findOne(
      { username },
      { id: 1, username: 1, hashedPassword: 1 },
    );
  }

  /***
   * Creates a new User
   * @param username
   * @param hashedPassword
   */
  public async create(username: string, hashedPassword: string): Promise<User> {
    const newUser = await this.userModel.create({ username, hashedPassword });
    return this.get(newUser.id);
  }
}
