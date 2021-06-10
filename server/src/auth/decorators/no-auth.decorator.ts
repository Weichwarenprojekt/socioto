import { SetMetadata } from '@nestjs/common';

/**
 * The decorator can be used to make a route unprotected in order to access it without a JWT token
 */
export const NO_AUTH = 'noAuth';
export const NoAuth = () => SetMetadata(NO_AUTH, true);
