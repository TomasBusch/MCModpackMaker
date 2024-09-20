import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { GetUserInput } from '../models/dto/get-user.input';
import { ListUserInput } from '../models/dto/list-user.input';
import { NewUserInput } from '../models/dto/new-user.input';
import { UpdateUserInput } from '../models/dto/update-user.input';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(payload: NewUserInput): Promise<User> {
    const createdUser = new this.userModel(payload);
    return createdUser.save();
  }

  async getById(_id: MongooseSchema.Types.ObjectId): Promise<User> {
    return this.userModel.findById(_id).exec();
  }

  async finOne(filters: GetUserInput): Promise<User> {
    return this.userModel.findOne({ ...filters }).exec();
  }

  async findMany(filters: ListUserInput): Promise<User[]> {
    return this.userModel
      .find()
      .setOptions({ ...filters })
      .exec();
  }

  async update(payload: UpdateUserInput): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(payload._id, payload, {
        new: true,
      })
      .exec();
  }

  async delete(_id: MongooseSchema.Types.ObjectId) {
    const deletedUser = await this.userModel.findByIdAndRemove({ _id: _id }).exec();
    return deletedUser;
  }
}
