const { getCollection } = require('../helper/getCollection')

exports.dropTypeCollections = getCollection('drop-type', {limit: 999, sort: ['name:asc']})