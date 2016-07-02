import api from './base'

class Status {

  static getStatus() {
    return api.get(`/status`)
  }

  static getBlocks() {
    return api.get(`/blocks`)
  }

//ledger
}
export default Status
