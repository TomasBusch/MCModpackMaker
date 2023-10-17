import { Field, InputType } from '@nestjs/graphql';
import {
  IsAlphanumeric,
  IsEmail,
  IsStrongPassword,
  IsUrl,
  MinLength,
} from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @IsAlphanumeric()
  username: string;

  @Field()
  @IsEmail()
  email?: string;

  @Field()
  @IsUrl()
  avatar_image: string;

  @Field()
  @MinLength(12)
  @IsStrongPassword()
  password: string;
}
