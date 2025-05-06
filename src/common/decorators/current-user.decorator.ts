import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JWTPayloadTypes } from '../utils/types/types';
import { CURRENT_USER_KEY } from '../utils/constants';

export const CurrentUser = createParamDecorator(
  (data: undefined, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const user = request[CURRENT_USER_KEY] as JWTPayloadTypes;
    return user;
  },
);
