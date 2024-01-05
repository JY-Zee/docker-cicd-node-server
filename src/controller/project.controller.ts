import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectService } from '../service/project.service';
import { PushProjectBody } from './constants';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('push')
  async pushProject(@Body() body: PushProjectBody): Promise<string> {
    return await this.projectService.pushProject(body);
  }
}
