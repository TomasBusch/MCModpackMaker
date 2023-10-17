import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResult {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  avatar_image: string;
}
