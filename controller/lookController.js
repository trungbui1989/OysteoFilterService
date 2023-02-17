const { getCollection } = require('../helper/getCollection')

exports.lookCollections = getCollection('look', {limit: 999, sort: ['name:asc']})