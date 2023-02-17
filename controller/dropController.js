const { getCollection } = require('../helper/getCollection')

exports.dropCollections = getCollection('drop', {limit: 999, sort: ['name:asc']})