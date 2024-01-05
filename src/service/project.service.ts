import { Injectable } from '@nestjs/common';
import { PushProjectBody } from 'src/controller/constants';
import { ProjectLocalUrl } from 'src/tools';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const shell = require('shelljs');
const fs = require('fs');

@Injectable()
export class ProjectService {
  async pushProject(project: PushProjectBody) {
    const { git, branch, projectName, env } = project;
    shell.exec(`chcp 65001`);
    shell.mkdir('-p', `${ProjectLocalUrl}/dev`);
    shell.mkdir('-p', `${ProjectLocalUrl}/prod`);
    shell.mkdir('-p', `${ProjectLocalUrl}/sit`);
    shell.mkdir('-p', `${ProjectLocalUrl}/uat`);

    shell.cd(`${ProjectLocalUrl}/${env}`);

    const isExist = fs.existsSync(`${ProjectLocalUrl}/${env}/${projectName}`);
    if (isExist) {
      shell.cd(projectName);
      await this.writeCommand(shell, 'git pull --all');
      await this.writeCommand(shell, `git checkout ${branch}`);
    } else {
      await this.writeCommand(shell, `git clone --branch ${branch} ${git} `);
      shell.cd(projectName);
    }

    await this.writeCommand(shell, 'pnpm install');
    await this.writeCommand(shell, 'pnpm build');

    // shell.exit(1);
    return Promise.resolve('success');
  }

  writeCommand(sh, command) {
    return new Promise((resolve, reject) => {
      sh.exec(command, (code, stdout, stderr) => {
        console.log('Exit code:', code);
        // todo code是什么，代表运行结束
        // if (code === 0) {
        //   resolve(null);
        // }
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
        resolve(null);
      });
    });
  }
}
