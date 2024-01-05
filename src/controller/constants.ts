export interface PushProjectBody {
  branch: string;
  env: string;
  git: string;
  password: string;
  projectName: string;
  username: string;
  [property: string]: any;
}

export interface CreateStackBody {
  /**
   * 环境
   */
  env: string;
  /**
   * 主机端口
   */
  localPort?: string;
  /**
   * nginx配置
   */
  nginx?: any;
  /**
   * 项目名字
   */
  projectName: string;
  [property: string]: any;
}

export interface StopStackBody {
  /**
   * 环境
   */
  env: string;
  /**
   * 项目名
   */
  projectName: string;
  [property: string]: any;
}
