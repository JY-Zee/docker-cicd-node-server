export const writeCommand = (sh, command: string) => {
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
};
