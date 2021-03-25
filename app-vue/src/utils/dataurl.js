import { getBaseUrl } from './request'
//  url
// 文件显示地址
export const showFileUrl = getBaseUrl('file')
// 文件服务器上传地址
export const fileUrl = showFileUrl + '/oss/upload/'
