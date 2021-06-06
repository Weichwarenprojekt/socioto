import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';
import { IssuedToken, IssuedTokenDocument } from './issued-token.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectModel(IssuedToken.name)
    private issuedTokenModel: Model<IssuedTokenDocument>,
  ) {}

  /**
   * Authenticates a user
   * @param username
   * @param passwordHash
   */
  async authenticateUser(
    username: string,
    passwordHash: string,
  ): Promise<User> {
    const user = await this.userService.getAuthInfo(username);

    if (!user) {
      return null;
    }

    const passwordValue = await argon2.verify(
      user.hashedPassword,
      passwordHash,
    );
    if (passwordValue) {
      delete user.hashedPassword;
      return user;
    }

    return null;
  }

  /**
   * Generates a new JWT for a user and inserts it additionally into the database
   * @param user
   */
  public async login(user: any): Promise<{ accessToken: string }> {
    const tokenPayload = {
      username: user.username,
      userId: user.id,
    };

    // Check if the current "session" count is exceeded
    const currentTokenCount = await this.getNumberOfIssuedTokens(user.id);
    if (
      process.env.MAX_SESSION_COUNT &&
      currentTokenCount > Number(process.env.MAX_SESSION_COUNT)
    ) {
      await this.clearIssuedTokens(user.id);
    }

    // Generation of a new token which is then stored in the db
    const accessToken = this.jwtService.sign(tokenPayload);
    await this.saveIssuedToken(user.id, accessToken);

    return {
      accessToken,
    };
  }

  /**
   * Registers a new user
   * @param username  The username of the user
   * @param password  The password of the user
   */
  public async register(username: string, password: string): Promise<User> {
    try {
      const hashedPassword = await argon2.hash(password);
      return await this.userService.create(username, hashedPassword);
    } catch (error) {
      // when an error occured within mongo (unique username, required value) we can throw a BadRequestError
      if (error.name === 'MongoError') {
        throw new BadRequestException();
      }

      throw error;
    }
  }

  /**
   * Checks if a token was issued by this service
   * @param token   The token which needs to be checked
   */
  public async checkIfTokenIssued(token: string): Promise<boolean> {
    const availableToken = await this.issuedTokenModel.findOne({
      accessToken: token,
    });

    if (!availableToken) {
      throw new UnauthorizedException({
        status: 401,
        message: 'Invalid token',
        error: 'Unauthorized',
      });
    }

    return true;
  }

  /**
   * Deletes an issued token from the database
   * @param token
   */
  public async deleteIssuedToken(token: string): Promise<void> {
    await this.issuedTokenModel.deleteOne({ accessToken: token });
  }

  /**
   * Saves an issued Token for a user in the database
   * @param userId
   * @param token
   * @private
   */
  private async saveIssuedToken(userId: number, token: string): Promise<void> {
    await this.issuedTokenModel.create({ accessToken: token, userId });
  }

  /**
   * Cleares the issued tokens for a user
   * @param userId
   * @private
   */
  private async clearIssuedTokens(userId: number): Promise<void> {
    await this.issuedTokenModel.deleteMany({ userId });
  }

  /**
   * Gets the number of currently valid tokens for a user
   * @param userId
   * @private
   */
  private async getNumberOfIssuedTokens(userId: number): Promise<number> {
    return this.issuedTokenModel.countDocuments({ userId });
  }
}
