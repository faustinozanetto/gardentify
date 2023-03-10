import { User } from '@modules/users/models/user.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { AuthTokens } from './token.model';

@ObjectType()
export class Auth extends AuthTokens {
  @Field(() => User)
  user: User;
}
