import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType()
export class NewModpackInput {
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
