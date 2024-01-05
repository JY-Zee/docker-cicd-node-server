import { Body, Controller, Post } from '@nestjs/common';
import { CreateStackBody, StopStackBody } from './constants';
import { DockerService } from 'src/service/docker.service';

@Controller('docker')
export class DockerController {
  constructor(private readonly dockerService: DockerService) {}

  @Post('createStack')
  async pushProject(@Body() body: CreateStackBody): Promise<string> {
    return await this.dockerService.createStack(body);
  }

  @Post('stopStack')
  async stopProject(@Body() body: StopStackBody): Promise<string> {
    return await this.dockerService.stopStack(body);
  }

  @Post('downStack')
  async downProject(@Body() body: StopStackBody): Promise<string> {
    return await this.dockerService.downStack(body);
  }

  @Post('restartStack')
  async restartProject(@Body() body: StopStackBody): Promise<string> {
    return await this.dockerService.restartStack(body);
  }
}
