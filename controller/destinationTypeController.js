const { getCollection } = require('../helper/getCollection')

exports.destinationTypeCollections = getCollection('destination-type', {limit: 999, sort:['name:asc']})