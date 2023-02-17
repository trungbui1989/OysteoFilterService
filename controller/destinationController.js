const { getCollection } = require('../helper/getCollection')

exports.destinationCollections = getCollection('destination', {limit: 999, sort: ['name:asc']})