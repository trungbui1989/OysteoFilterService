const { getCollection } = require('../helper/getCollection')

exports.articleCollections = getCollection('article', {limit: 999, sort: ['name:asc']})