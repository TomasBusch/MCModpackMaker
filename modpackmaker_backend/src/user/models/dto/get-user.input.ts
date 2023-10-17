import { ArgsType, Field } from '@nestjs/graphql';
import { IsAlphanumeric, IsEmail } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

@ArgsType()
export class GetUserInput {
  @Field(() => String, { nullable: true })
  _id?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  @IsAlphanumeric()
  username?: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  email?: string;
}
