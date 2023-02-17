// getLoadFullFieldsData - fill full data for missing data fields in pages
exports.getLoadFullFieldsData = (
    page,
    data
) => {
    if (page) {
        page.sections = (page.sections || []).reduce(
            (acc, item) => {
                if (data.drops) {
                    if (item.drop) {
                        const dropSelected = (data.drops || []).find(
                            (itemDrop) =>
                                (itemDrop?.id || '').toString() ===
                                (item.drop?.id || '').toString(),
                        );
                        if (dropSelected) {
                            item.drop = dropSelected;
                        }
                    } else if ((item.drops || []).length > 0) {
                        item.drops = getDrops(item.drops, data.drops);
                    }
                }
                if (data.looks) {
                    if (item.look) {
                        const lookSelected = (data.looks || []).find(
                            (itemLook) =>
                                (itemLook?.id || '').toString() ===
                                (item.look?.id || '').toString(),
                        );
                        if (lookSelected) {
                            item.look = lookSelected;
                        }
                    } else if ((item.looks || []).length > 0) {
                        item.looks = getLooks(item.looks, data.looks);
                    }
                }
                if (data.articles) {
                    if ((item.articles || []).length > 0) {
                        let displayOrder = item.displayOrder ? item.displayOrder.split(',') : []
                        let articlesItem = getArticles(item.articles, data.articles);
                        let hashMap = [];
                        let outStack = [];
                        if (displayOrder.length <= 0) {
                            item.articles = articlesItem
                        } else {
                            for (let i = 0; i <= articlesItem.length - 1; i++) {
                                if (displayOrder[i]) {
                                    hashMap[Number(displayOrder[i]) - 1] = articlesItem[i]
                                } else {
                                    outStack.push(articlesItem[i])
                                }
                            }
                            if (outStack.length > 0) {
                                item.articles = []
                                const condictionLength = hashMap.length + outStack.length
                                for (let i = 0; i < condictionLength; i++) {
                                    if (hashMap[i]) {
                                        item.articles.push(hashMap[i])
                                    } else {
                                        if (outStack.length > 0) {
                                            item.articles.push(outStack.shift())
                                        }
                                    }
                                }
                            } else {
                                item.articles = item.articles = hashMap.reduce((total, item) => {
                                    if (item) {
                                        total.push(item)
                                    }
                                    return total
                                }, [])
                            }
                        }
                    }
                }
                if (item.mixedGalleries) {
                    item.mixedGalleries = item.mixedGalleries.reduce((total, ele) => {
                        if (ele.article && data.articles) {
                            let articleData = data.articles.find(articleItem => {
                                return articleItem.uid == ele.article.uid
                            })?.sections.find(section => section.__component === "banners.article-hero")
                            total.push({
                                gallery: articleData?.heroGallery.gallery || [],
                                title: articleData?.articleTitle.reduce((total, item) => {
                                    if (item) {
                                        total === '' ? total = total.concat(item.article_title_2) : total = total.concat('\n', item.article_title_2)
                                    }
                                    return total
                                }, ''),
                                subtitle: articleData?.subtitle.reduce((total, item) => {
                                    if (item) {
                                        total === '' ? total = total.concat(item.subtitle_2) : total = total.concat('\n', item.subtitle_2)
                                    }
                                    return total
                                }, ''),
                                uid: ele?.article?.uid || '',
                                categoryTitle: articleData?.categoryTitle || '',
                                collectionType: "articles"
                            })
                        }
                        if (ele.destination && data.destinations) {
                            let destinationData = data.destinations.find(destinationItem => {
                                return destinationItem.id == ele.destination.id
                            })
                            total.push({
                                gallery: destinationData?.gallery || [],
                                title: destinationData?.name || '',
                                subtitle: destinationData?.description || '',
                                uid: destinationData?.id || '',
                                categoryTitle: destinationData?.type1 || '',
                                collectionType: "destinations"
                            })
                        }
                        if (ele.experience && data.experiences) {
                            let experienceData = data.experiences.find(experienceItem => {
                                return experienceItem.id == ele.experience.id
                            })
                            let experienceSectionData = experienceData?.sections.find(section =>
                                section.__component === "mixing.experiences-hero"
                            )
                            total.push({
                                gallery: experienceSectionData?.experiencesHeroBanner?.gallery || [],
                                title: experienceSectionData?.experiencesTitle || '',
                                subtitle: experienceSectionData?.experiencesSubTitle || '',
                                uid: experienceData?.id || '',
                                categoryTitle: experienceData?.type1 || '',
                                collectionType: "experiences"
                            })
                        }
                        if (ele.promotion && data.drops) {
                            let dropData = data.drops.find(dropItem => {
                                return dropItem.id == ele.promotion.id
                            })
                            let dropSectionData = dropData?.sections.find(section =>
                                section.__component === "banners.drop-hero"
                            )
                            total.push({
                                gallery: dropSectionData?.dropHeroGallery.gallery || [],
                                title: dropData?.name || '',
                                subtitle: dropSectionData?.subtitle || '',
                                uid: dropData?.uid || '',
                                categoryTitle: dropData?.type1.id || '',
                                collectionType: "drops"
                            })
                        }
                        if (ele.look && data.looks) {
                            let lookData = data.looks.find(lookItem => {
                                return lookItem.id == ele.look.id
                            })
                            let lookSectionData = lookData?.sections.find(section =>
                                section.__component === "banners.look-hero"
                            )
                            let lookHero = lookData?.sections.find(ele => ele.__component === "banners.look-hero")
                            total.push({
                                gallery: lookSectionData?.gallery || [],
                                title: lookHero?.lookTitle || '',
                                subtitle: lookSectionData?.subtitle || '',
                                uid: lookData?.uid || '',
                                categoryTitle: lookHero?.categoryTitle || '',
                                collectionType: "looks"
                            })
                        }
                        return total
                    }, []);
                }
                acc.push(item);
                return acc;
            }, []
        );
    }
    return page;
}

// getLoadFullFieldsMagazine - fill full data for missing data fields in magazine collection
exports.getLoadFullFieldsMagazine = (
    page,
    data,
) => {
    if (page) {
        let mixedGalleries = page.mixedGalleries.map((ele) => {
            if (ele.article && data.articles) {
                let articleData = data.articles?.find(articleItem => {
                    return articleItem.uid == ele.article.uid
                })?.sections.find(section => section.__component === "banners.article-hero")
                return ({
                    gallery: articleData?.heroGallery.gallery || [],
                    title: articleData?.articleTitle.reduce((total, item) => {
                        if (item) {
                            total === '' ? total = total.concat(item.article_title_2) : total = total.concat('\n', item.article_title_2)
                        }
                        return total
                    }, ''),
                    subtitle: articleData?.subtitle.reduce((total, item) => {
                        if (item) {
                            total === '' ? total = total.concat(item.subtitle_2) : total = total.concat('\n', item.subtitle_2)
                        }
                        return total
                    }, ''),
                    uid: ele?.article?.uid || '',
                    categoryTitle: articleData?.categoryTitle || '',
                    collectionType: "articles"
                })
            }
            if (ele.destination && data.destinations) {
                let destinationData = data.destinations.find(destinationItem => {
                    return destinationItem.id == ele.destination.id
                })
                return ({
                    gallery: destinationData?.gallery || [],
                    title: destinationData?.name || '',
                    subtitle: destinationData?.description || '',
                    uid: destinationData?.id || '',
                    categoryTitle: destinationData?.type1 || '',
                    collectionType: "destinations"
                })
            }
            if (ele.experience && data.experiences) {
                let experienceData = data.experiences?.find(experienceItem => {
                    return experienceItem.id == ele.experience.id
                })
                let experienceSectionData = experienceData?.sections?.find(section =>
                    section.__component === "mixing.experiences-hero"
                )
                return ({
                    gallery: experienceSectionData?.experiencesHeroBanner?.gallery || [],
                    title: experienceSectionData?.experiencesTitle || '',
                    subtitle: experienceSectionData?.experiencesSubTitle || '',
                    uid: experienceData?.id || '',
                    categoryTitle: experienceData?.type1 || '',
                    collectionType: "experiences"
                })
            }
            if (ele.promotion && data.drops) {
                let dropData = data.drops.find(dropItem => {
                    return dropItem.id == ele.promotion.id
                })
                let dropSectionData = dropData?.sections?.find(section =>
                    section.__component === "banners.drop-hero"
                )
                return ({
                    gallery: dropSectionData?.dropHeroGallery.gallery || [],
                    title: dropData?.name || '',
                    subtitle: dropSectionData?.subtitle || '',
                    uid: dropData?.uid || '',
                    categoryTitle: dropData?.type1.id || '',
                    collectionType: "drops"
                })
            }
            if (ele.look && data.looks) {
                let lookData = data.looks?.find(lookItem => {
                    return lookItem.id == ele.look.id
                })
                let lookSectionData = lookData?.sections?.find(section =>
                    section.__component === "banners.look-hero"
                )
                let lookHero = lookData?.sections?.find(ele => ele.__component === "banners.look-hero")
                return ({
                    gallery: lookSectionData?.gallery || [],
                    title: lookHero?.lookTitle || '',
                    subtitle: lookSectionData?.subtitle || '',
                    uid: lookData?.uid || '',
                    categoryTitle: lookHero?.categoryTitle || '',
                    collectionType: "looks"
                })
            }
        })
        return { ...page, mixedGalleries: mixedGalleries }
    }
}

// getArticles
function getArticles(articlesSelected, articles) {
    if ((articlesSelected || []).length > 0) {
      return articlesSelected.reduce((acc, item) => {
        const articleSelected = articles.find(
          (itemArticle) =>
            (itemArticle?.id || '').toString() === (item?.id || '').toString(),
        );
        if (articleSelected) {
          acc.push(articleSelected);
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    }
    return [];
  }
  
// getDrops
  function getDrops(dropsSelected, drops) {
    if ((dropsSelected || []).length > 0) {
      return dropsSelected.reduce((acc, item) => {
        const dropSelected = drops.find(
          (itemDrop) =>
            (itemDrop?.id || '').toString() === (item?.id || '').toString(),
        );
        if (dropSelected) {
          acc.push(dropSelected);
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    }
    return [];
  }

// getLooks
  function getLooks(looksSelected, looks) {
    if ((looksSelected || []).length > 0) {
      return looksSelected.reduce((acc, item) => {
        const lookSelected = looks.find(
          (itemLook) =>
            (itemLook?.id || '').toString() === (item?.id || '').toString(),
        );
        if (lookSelected) {
          acc.push(lookSelected);
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    }
    return [];
  }
  