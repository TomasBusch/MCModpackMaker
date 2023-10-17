/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Schema as MongooseSchema } from 'mongoose';
import { ListModpackInput } from '../models/dto/list-modpack.input';
import { NewModpackInput } from '../models/dto/new-modpack.input';
import { UpdateModpackInput } from '../models/dto/update-modpack.input';
import { Modpack } from '../models/modpack.model';
import { ModpackService } from '../service/modpack.service';

const pubSub = new PubSub();

@Resolver(() => Modpack)
export class ModpackResolver {
  constructor(private readonly modpackService: ModpackService) {}

  @Query(() => Modpack, { name: 'getModpack' })
  async get(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ): Promise<Modpack> {
    const modpack = await this.modpackService.getById(_id);
    if (!modpack) {
      throw new NotFoundException(_id);
    }
    return modpack;
  }

  @Query(() => [Modpack], { name: 'getModpackList' })
  async getList(@Args() payload: ListModpackInput): Promise<Modpack[]> {
    return this.modpackService.findMany(payload);
  }

  @Mutation(() => Modpack, { name: 'createModpack' })
  async create(
    @Args('newModpackData') payload: NewModpackInput,
  ): Promise<Modpack> {
    const modpack = await this.modpackService.create(payload);
    pubSub.publish('modpackAdded', { modpackAdded: modpack });
    return modpack;
  }

  @Mutation(() => Modpack, { name: 'updateModpack' })
  async update(@Args('payload') payload: UpdateModpackInput) {
    return this.modpackService.update(payload);
  }

  @Mutation(() => Boolean, { name: 'deleteModpack' })
  async delete(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.modpackService.delete(_id);
  }

  @Subscription(() => Modpack, { name: 'modpackAdded' })
  async added() {
    return pubSub.asyncIterator('modpackAdded');
  }
}
