import { localStorageChange } from './index'

const gatewayConst = {
  default: '',
  baseAccount: 'cec-saas-basic-account',
  organ: 'cec-saas-basic-manager-organ'
}

export const gateways = localStorageChange('businessGateway', gatewayConst)

export default gateways
