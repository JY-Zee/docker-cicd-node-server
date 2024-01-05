import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectController } from './controller/project.controller';
import { ProjectService } from './service/project.service';
import { DockerController } from './controller/docker.controller';
import { DockerService } from './service/docker.service';

@Module({
  imports: [],
  controllers: [AppController, ProjectController, DockerController],
  providers: [AppService, ProjectService, DockerService],
})
export class AppModule {}
