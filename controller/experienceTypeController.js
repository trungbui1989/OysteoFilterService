const { getCollection } = require('../helper/getCollection')

exports.experienceTypeCollections = getCollection('experience-type', {limit: 999, sort: ['name:asc']})