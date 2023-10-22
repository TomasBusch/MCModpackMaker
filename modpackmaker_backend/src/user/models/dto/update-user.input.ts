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

  @Field({ nullable: true })
  @IsAlphanumeric()
  username: string;

  @Field({ nullable: true })
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsUrl()
  avatar_image: string;

  @Field({ nullable: true })
  @MinLength(12)
  @IsStrongPassword()
  password: string;
}
