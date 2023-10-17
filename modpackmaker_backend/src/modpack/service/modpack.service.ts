import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { ListModpackInput } from '../models/dto/list-modpack.input';
import { NewModpackInput } from '../models/dto/new-modpack.input';
import { UpdateModpackInput } from '../models/dto/update-modpack.input';
import { Modpack } from '../models/modpack.model';

@Injectable()
export class ModpackService {
  constructor(
    @InjectModel(Modpack.name) private modpackModel: Model<Modpack>,
  ) {}

  async create(payload: NewModpackInput): Promise<Modpack> {
    const createdModpack = new this.modpackModel(payload);
    return createdModpack.save();
  }

  async getById(_id: MongooseSchema.Types.ObjectId): Promise<Modpack> {
    return this.modpackModel.findById(_id).exec();
  }

  async findOne(filters: ListModpackInput): Promise<Modpack[]> {
    return this.modpackModel
      .find()
      .setOptions({ ...filters })
      .exec();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findMany(filters: ListModpackInput): Promise<Modpack[]> {
    return this.modpackModel
      .find()
      .setOptions({ ...filters })
      .exec();
  }

  async update(payload: UpdateModpackInput): Promise<Modpack> {
    return this.modpackModel
      .findByIdAndUpdate(payload._id, payload, {
        new: true,
      })
      .exec();
  }

  async delete(_id: MongooseSchema.Types.ObjectId) {
    const deletedModpack = await this.modpackModel
      .findByIdAndRemove({ _id: _id })
      .exec();
    return deletedModpack;
  }

  async addMod(_id: string, modId: string): Promise<void> {
    this.modpackModel.updateOne({ _id: _id }, { $push: { modId: modId } });
  }
}
