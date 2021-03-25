module.exports = {
  projectName: '业务平台',
  privateKey: '',
  passphrase: '',
  cluster: [],
  dev: {
    name: '开发环境',
    script: 'npm run build',
    host: '192.168.4.72',
    port: 22,
    username: 'root',
    password: 'ABCabc123',
    distPath: 'dist',
    webDir: '/data/web/saasBusDev/dist',
    commend: '/data/sh/start_port.sh dev',
    isRemoveRemoteFile: true,
    isRemoveLocalFile: true
  }
}
