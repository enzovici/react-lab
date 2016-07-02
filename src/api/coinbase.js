import api from './base'

class Coinbase {

  static getCoinbase() {
    return api.get(`/coinbase`)
  }
}

export default Coinbase
