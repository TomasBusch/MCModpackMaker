import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class UpdateModpackInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @MaxLength(50)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  image: string;

  @Field()
  version: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [String])
  modIdList: string[];
}
