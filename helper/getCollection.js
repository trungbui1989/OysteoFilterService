const axios = require('axios')

exports.getCollection = (index, options) => {
    return axios.post(`${process.env.VITE_MEILISEARCH_URL}/indexes/${index}/search`, options, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.VITE_MEILISEARCH_PUBLIC_API_KEY}`,
        }
    })
}