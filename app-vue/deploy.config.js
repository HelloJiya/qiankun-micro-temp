const config = {
  projectName: '智慧运维', // 项目名称
  dev: {
    host: '192.168.4.72', // 服务器地址
    port: '22',
    username: 'root', // 登录用户名
    password: 'ABCabc123', // 登录密码
    webDir: '/data/web/saasIMS/dist', // 项目上传的服务器文件目录
    distPath: 'dist', // 打包好需要上传的目录
    // commend: '/data/sh/start_port.sh saasIMS dev',
    name: '开发环境', // 环境名称
    script: 'npm run build', // 打包命令
    isRemoveRemoteFile: true, // 是否删除远程文件（默认true）
    isRemoveLocalFile: true // 是否删除本地文件（默认true）
  }
}

module.exports = config
