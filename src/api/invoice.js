import api from './base'
import catchAll from '../utils/catch_all'
import _ from 'underscore'
import qs from 'qs'
import axios from 'axios'

const rawApi = axios.create({
  responseType: 'json',
})

const path = "assets"

const sortDesc = (assets) => {
  return _(assets).sortBy((asset) => {
    return -asset.id
  })
}

const allPages = () => {
  return api.get(`${path}?organization=1&category=Sent&kind=Invoice&page=1`)
    .then((page) => {
      page = page.data
      let urls = []
      let lastPageLink = page.links.last
      let queryString = qs.parse(lastPageLink)
      let lastPage = Number(queryString.page)
      let pagesNum = _.range(2, lastPage+1)
      pagesNum.forEach((idx) => {
        queryString.page = idx
        urls.push(qs.stringify(queryString))
      })

      let reqs = []
      urls.forEach((url) => {
        reqs.push(rawApi.get(decodeURIComponent(url)))
      })

      page = page.data
      return Promise.all(reqs)
        .catch(console.error)
        .then((pages) => {
          let pagesData = []
          pages.forEach((pag) => {
            pagesData.push(pag.data.data)
          })
          let pagesArray = _.flatten(_.union([[page],pagesData]))
          pagesArray = sortDesc(pagesArray)
          return pagesArray
        })
        .catch(console.error)
    })
}

export default class Invoice {

  static all() {
    return allPages()
  }

  static allPage(page) {
    page = page || 1
    return api.get(`${path}?organization=1&category=Sent&kind=Invoice&page=${page}`)
  }

  static get(id) {
    return api.get(`asset/${id}`)
  }

  static create(data) {
    let invoice = {
      "kind": data.kind,
      "sender": data.sender,
      "recipient": data.recipient,
      "details": {
          "terms": {
              "amount": data.amount,
              "dueDate": data.dueDate
          }
      },
      "mapping": {
          "provider": data.provider,
          "reference": data.reference
        }
    }

    return api.post(`${path}`, invoice)
    .catch(catchAll)
    .then((data) => {
      return Promise.resolve(data)
    })
    .catch(catchAll)
}

static update() {
  return {}
}

static count() {
  return api.get(`coinbase`)
    .catch(catchAll)
    .then((res) => {
      return Promise.resolve(res.data.data.assetsCount)
    })
    .catch(catchAll)
  }
}
