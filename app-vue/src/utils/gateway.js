import { localStorageChange } from './index'

const gatewayConst = {
  // default: 'cec-saas-basic-account'
  CECIMS: 'cec-ims-server',
  file: 'cec-file',
  baseAccount: 'cec-saas-basic-account',
  organ: 'cec-saas-basic-manager-organ'
}

export const gateways = localStorageChange('imsGateway', gatewayConst)

export default gateways
