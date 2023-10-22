import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Modpack, ModpackSchema } from './models/modpack.model';
import { ModpackResolver } from './resolvers/modpack.resolver';
import { ModpackService } from './services/modpack.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Modpack.name, schema: ModpackSchema }])],
  controllers: [],
  providers: [ModpackService, ModpackResolver],
})
export class ModpackModule {}
