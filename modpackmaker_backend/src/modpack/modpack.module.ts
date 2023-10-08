import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModpackService } from './modpack.service';
import { Modpack, ModpackSchema } from './models/modpack/modpack.model';
import { ModpackResolver } from './modpack.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Modpack.name, schema: ModpackSchema }]),
  ],
  controllers: [],
  providers: [ModpackService, ModpackResolver],
})
export class ModpackModule {}
