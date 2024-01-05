import { Injectable } from '@nestjs/common';
import { CreateStackBody, StopStackBody } from 'src/controller/constants';
import { ProjectLocalUrl } from 'src/tools';
import { writeCommand } from './tools/shellTools';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const shell = require('shelljs');
const fs = require('fs');

@Injectable()
export class DockerService {
  async createStack(body: CreateStackBody): Promise<string> {
    const { env, projectName } = body;
    shell.exec(`chcp 65001`);

    // 进入目录
    // todo 后期自动生成docker-compose文件
    shell.cd(`${ProjectLocalUrl}/${env}/${projectName}/docker/${env}`);

    // todo 后期自动根据前端输入，生成nginx.conf文件

    // 关闭已有compose
    // await writeCommand(
    //   shell,
    //   `docker compose -p ${projectName}-${env} down --volumes`,
    // );
    await this.downStack(body);

    // 创建compose
    // await writeCommand(shell, 'ls');
    await writeCommand(
      shell,
      `docker compose  -f ./docker-compose.yml -p ${projectName}-${env} up -d`,
    );

    // shell.exit(1);
    return Promise.resolve('createStack');
  }

  async stopStack(body: StopStackBody): Promise<string> {
    const { env, projectName } = body;
    shell.exec(`chcp 65001`);
    await writeCommand(shell, `docker compose -p ${projectName}-${env} stop`);
    return Promise.resolve('stopStack');
  }

  async downStack(body: StopStackBody): Promise<string> {
    const { env, projectName } = body;
    shell.exec(`chcp 65001`);
    await writeCommand(
      shell,
      `docker compose -p ${projectName}-${env} down --volumes`,
    );
    return Promise.resolve('downStack');
  }

  async restartStack(body: StopStackBody): Promise<string> {
    const { env, projectName } = body;
    shell.exec(`chcp 65001`);
    await writeCommand(
      shell,
      `docker compose -p ${projectName}-${env} restart `,
    );
    return Promise.resolve('downStack');
  }
}
