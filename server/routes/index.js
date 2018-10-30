const user = require('./user')
const table = require('./table')
module.exports = (router) => {
    user(router)
    table(router)
}
