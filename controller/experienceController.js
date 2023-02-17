const { getCollection } = require('../helper/getCollection')

exports.experienceCollections = getCollection('experience', {limit: 999, sort: ['name:asc']})