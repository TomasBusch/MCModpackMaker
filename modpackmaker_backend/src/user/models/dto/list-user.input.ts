import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min, IsEmail, IsAlphanumeric } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

@ArgsType()
export class ListUserInput {
  @Field(() => String, { nullable: true })
  _id?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  @IsAlphanumeric()
  username?: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  email?: string;

  @Field(() => Int)
  @Min(0)
  skip = 0;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  limit = 25;
}
