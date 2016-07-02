import wrapper from './wrapper'

let getById = {id: 2}
const foo = () => {console.log('ok')}

wrapper.assets.getById(getById, foo)
