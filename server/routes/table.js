const tableController = require('./../controllers/table.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()
module.exports = (router) => {
    /**
     * get all tables
     */
    router
        .route('/tables')
        .get(tableController.getAll)
    /**
     * add a table
     */
    router
        .route('/table')
        .post(multipartWare, tableController.addTable)
    /**
     * add a guest to a table
     */
    router
        .route('/table/clap')
        .post(tableController.addGuestToTable)
    /**
     * comment on a table
     */
    router
        .route('/article/comment')
        .post(tableController.commentTable)
    /**
     * get a particlular table to view
     */
    router
        .route('/table/:id')
        .get(tableController.getTable)
}
