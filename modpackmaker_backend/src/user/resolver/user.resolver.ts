import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import * as Mongoose from 'mongoose';
import { ListUserInput } from '../models/dto/list-user.input';
import { NewUserInput } from '../models/dto/new-user.input';
import { UpdateUserInput } from '../models/dto/update-user.input';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

const pubSub = new PubSub();

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'getUser' })
  async get(
    @Args('_id', { type: () => String })
    _id: Mongoose.Schema.Types.ObjectId,
  ): Promise<User> {
    const user = await this.userService.getById(_id);
    if (!user) {
      throw new NotFoundException(_id);
    }
    return user;
  }

  @Query(() => [User], { name: 'getUserList' })
  async getList(@Args() payload: ListUserInput): Promise<User[]> {
    return this.userService.findMany(payload);
  }

  @Mutation(() => User, { name: 'createUser' })
  async create(@Args('newUserData') payload: NewUserInput): Promise<User> {
    const user = await this.userService.create(payload);
    pubSub.publish('userAdded', { modpackAdded: user });
    return user;
  }

  @Mutation(() => User, { name: 'updateUser' })
  async update(@Args('payload') payload: UpdateUserInput) {
    return this.userService.update(payload);
  }

  @Mutation(() => Boolean, { name: 'deleteUser' })
  async delete(@Args('_id', { type: () => String }) _id: Mongoose.Schema.Types.ObjectId) {
    return this.userService.delete(_id);
  }

  @Subscription(() => User, { name: 'modpackAdded' })
  async added() {
    return pubSub.asyncIterator('userAdded');
  }
}
