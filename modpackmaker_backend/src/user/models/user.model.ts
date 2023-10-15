import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  username: string;

  @Field(() => String)
  @Prop()
  email: string;

  @Field(() => String)
  @Prop()
  session: string;

  @Field(() => String)
  @Prop()
  avatar_image: string;

  @Field(() => String)
  @Prop()
  password: string;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
