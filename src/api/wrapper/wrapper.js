import wrapper from './wrapper-js/wrapper'

let wrapper = new wrapper({
  host: "localhost",
  port: "3001",
  version: "0.2.0",
  timeout: 5000,
  debug: false
})

export default wrapper
