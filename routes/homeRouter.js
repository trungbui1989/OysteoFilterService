// get collections
const { dropCollections } = require('../controller/dropController')
const { lookCollections } = require('../controller/lookController')
const { articleCollections } = require('../controller/articleController')
const { destinationCollections } = require('../controller/destinationController')
const { experienceCollections } = require('../controller/experienceController')
const { destinationTypeCollections } = require('../controller/destinationTypeController')
const { experienceTypeCollections } = require('../controller/experienceTypeController')
const { dropTypeCollections } = require('../controller/dropTypeController')
const { homePage } = require('../controller/pageController')
const { magazineCollections } = require('../controller/magazineController')

// change data functions
const { getLoadFullFieldsData, getLoadFullFieldsMagazine } = require('../helper/getFullField')

exports.getHomePage = (req, res) => {
    Promise.all([
        dropCollections,
        lookCollections,
        articleCollections,
        destinationCollections,
        experienceCollections,
        destinationTypeCollections,
        experienceTypeCollections,
        dropTypeCollections,
        homePage,
        magazineCollections
    ])
    .then((results) => {
        const drops = results[0].data.hits || []
        const looks = results[1].data.hits || []
        const articles = results[2].data.hits || []
        const destinations = results[3].data.hits || []
        const experiences = results[4].data.hits || []
        const destinationTypes = results[5].data.hits || []
        const experienceTypes = results[6].data.hits || []
        const dropTypes = results[7].data.hits || []
        const homePage = results[8].data.hits[0] || []
        const magazine = results[9].data.hits[0] || []

        const page = getLoadFullFieldsData(homePage, {
            drops,
            articles,
            destinations,
            experiences,
            looks,
        });
        const magazines = getLoadFullFieldsMagazine (magazine, {
            drops,
            articles,
            destinations,
            experiences,
            looks,
        })

        // test
        res.send({
            page: page,
            magazines: magazines,
            experienceTypes: experienceTypes,
            destinationTypes: destinationTypes,
            dropTypes: dropTypes
        })
    })
    .catch(err => {
        console.error('err: ', err)
        res.send(err)
    })
}