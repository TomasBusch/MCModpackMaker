/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Schema as MongooseSchema } from 'mongoose';
import { ListModpackInput } from './models/modpack/dto/list-modpack.input';
import { NewModpackInput } from './models/modpack/dto/new-modpack.input';
import { UpdateModpackInput } from './models/modpack/dto/update-modpack.input';
import { Modpack } from './models/modpack/modpack.model';
import { ModpackService } from './modpack.service';

const pubSub = new PubSub();

@Resolver(() => Modpack)
export class ModpackResolver {
  constructor(private readonly modpackService: ModpackService) {}

  @Query(() => Modpack)
  async modpack(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ): Promise<Modpack> {
    const modpack = await this.modpackService.getById(_id);
    if (!modpack) {
      throw new NotFoundException(_id);
    }
    return modpack;
  }

  @Query(() => [Modpack])
  async modpacks(@Args() payload: ListModpackInput): Promise<Modpack[]> {
    return this.modpackService.list(payload);
  }

  @Mutation(() => Modpack)
  async createModpack(
    @Args('newModpackData') payload: NewModpackInput,
  ): Promise<Modpack> {
    const modpack = await this.modpackService.create(payload);
    pubSub.publish('modpackAdded', { modpackAdded: modpack });
    return modpack;
  }

  @Mutation(() => Modpack)
  async updatePerson(@Args('payload') payload: UpdateModpackInput) {
    return this.modpackService.update(payload);
  }

  @Mutation(() => Boolean)
  async deleteModpack(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.modpackService.delete(_id);
  }

  // @Subscription(() => Modpack)
  // async modpackAdded() {
  //   return pubSub.asyncIterator('modpackAdded');
  // }
}
