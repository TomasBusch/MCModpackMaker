import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsAlphanumeric, IsEmail, IsOptional, Max, Min } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

@ArgsType()
export class ListUserInput {
  @Field(() => String, { nullable: true })
  @IsAlphanumeric()
  @IsOptional()
  username?: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field(() => Int)
  @Min(0)
  skip = 0;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  limit = 25;
}
