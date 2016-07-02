import api from './base'

const path = "organizations"


const catchAll = (err) => {
  console.error("Error:", err)
  return Promise.reject(err)
}

class Organization {

  static all() {
    return api.get(`${path}?kind=1`) // todo organization count and getByType????
  }

  static getById(id) {
    return api.get(`organization/${id}`)
  }

  static getByReference(provider,reference) {
    return api.get(`${path}/${provider}/${reference}`)
  }

  static create(organization) {
    return api.post(`${path}`, organization)
    .catch(catchAll)
    .then((data) => {
      console.log("Organization.create(): ", data)
      return Promise.resolve(data)
    })
    .catch(catchAll)
  }

  static updateProfile(id,name,countryCode) {
    return api.post(`${path}/${id}/profile`, organization)
    .catch(catchAll)
    .then((data) => {
      console.log("Organization.update(): ", data)
      return Promise.resolve(data)
    })
    .catch(catchAll)
  }

}

export default Organization
