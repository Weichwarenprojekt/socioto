import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/***
 * This class is used to define the type of AuthGuard that is used by the software. In order to change authentication
 * to another provider/solution a new strategy has to be defined (e.g example.strategy.ts) and the strategy
 * has to be passed to the AuthGuard() annotation (e.g AuthGuard('example')
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
