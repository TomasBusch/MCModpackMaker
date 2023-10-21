import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LogoutResult {
  @Field()
  status: string;
}
