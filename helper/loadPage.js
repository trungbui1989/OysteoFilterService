const { getCollection } = require('./getCollection')

exports.loadFeature = async (uid) => {
    return await getCollection('page', {
        filter: [`uid = ${uid}`],
    })
}
  
exports.getOneByUid = async (index, uid) => {
    return await getCollection(index, {
        filter: [`uid = ${uid}`],
    })
}