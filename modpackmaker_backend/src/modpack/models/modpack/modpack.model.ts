import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Modpack {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  image: string;

  @Field(() => String)
  @Prop()
  version: string;

  @Field(() => [String])
  @Prop()
  modIdList: string[];
}

export type ModpackDocument = HydratedDocument<Modpack>;

export const ModpackSchema = SchemaFactory.createForClass(Modpack);
