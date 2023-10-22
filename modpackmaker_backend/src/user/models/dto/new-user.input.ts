import { Field, InputType } from '@nestjs/graphql';
import {
  IsAlphanumeric,
  IsEmail,
  IsOptional,
  IsStrongPassword,
  IsUrl,
  MinLength,
} from 'class-validator';

@InputType()
export class NewUserInput {
  @Field(() => String)
  @IsAlphanumeric()
  username: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  @IsUrl()
  @IsOptional()
  avatar_image: string;

  @Field(() => String)
  @MinLength(12)
  @IsStrongPassword()
  password: string;
}
