import { Field, ObjectType } from '@nestjs/graphql';
import * as NestMongoose from '@nestjs/mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument, Model, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ unique: true })
  username: string;

  @Field(() => String)
  @Prop({ unique: true })
  email: string;

  @Field(() => String)
  @Prop()
  session: string;

  @Field(() => String)
  @Prop()
  avatar_image: string;

  @Exclude()
  @Field(() => String)
  @Prop()
  password: string;

  @Prop({ type: [String], default: [] })
  roles: string[];
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
