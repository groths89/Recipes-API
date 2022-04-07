const PORT = process.env.PORT || 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const dataSources = [
    {
        name: 'all-recipes',
        address: {
            dinner: 'https://www.allrecipes.com/recipes/17562/dinner/',
        },
        base: ''
    },
    {
        name: 'skinny-taste',
        address: {
            dinner: 'https://www.skinnytaste.com/recipes/dinner-recipes/',
        },
        base: ''
    },
    {
        name: 'simply-recipes',
        address: {
            dinner: 'https://www.simplyrecipes.com/dinner-recipes-5091433',
        },
        base: 'https://www.simplyrecipes.com/'
    },
    {
        name: 'my-recipes',
        address: {
            dinner: 'https://www.myrecipes.com/dinner-recipes',
        },
        base: ''
    },
    {
        name: 'epicurious',
        address: {
            dinner: 'https://www.epicurious.com/meal/dinner',
        },
        base: 'https://www.epicurious.com'
    },
    {
        name: 'serious-eats',
        address: {
            dinner: 'https://www.seriouseats.com/quick-dinner-recipes-5117810',
        },
        base: ''
    },
    {
        name: 'food-52',
        address: {
            dinner: 'https://food52.com/recipes/dinner',
        },
        base: 'https://food52.com'
    }
]

const app = express();

const dinnerRecipes = [];

dataSources.forEach(dataSource => {
    axios.default(dataSource.address.dinner)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            if (dataSource.name === 'all-recipes') {
                $('div[class="component card card__category"]', html).each(function () {
                    const title = $(this).find('div.card__detailsContainer > div > a').attr('title');
                    const url = $(this).find('div.card__detailsContainer > div > a').attr('href');
                    const category = 'dinner';

                    dinnerRecipes.push({
                        title,
                        url,
                        category,
                        source: dataSource.name
                    })
                })                
            }

            if (dataSource.name === 'skinny-taste') {
                $('div[class="archive-post first"]').find('a').each(function () {
                    const title = $(this).attr('title');
                    const url = $(this).attr('href');
                    const category = 'dinner';

                    dinnerRecipes.push({
                        title,
                        url,
                        category,
                        source: dataSource.name
                    })
                })
            }

            if (dataSource.name === 'simply-recipes') {
                $('a[class="comp mntl-card-list-items mntl-document-card mntl-card card"]').each(function () {
                    const title = $(this).find('div.card__content > span > span').text();
                    const url = $(this).attr('href');
                    const category = 'dinner';

                    dinnerRecipes.push({
                        title,
                        url,
                        category,
                        source: dataSource.name
                    })                    
                })
            }

            if (dataSource.name === 'my-recipes') {
                $('div[class="component card card__category"]').each(function () {
                    const title = $(this).find('div.card__detailsContainer > div > a').attr('title');
                    const url = $(this).find('div.card__detailsContainer > div > a').attr('href');
                    const category = 'dinner';

                    dinnerRecipes.push({
                        title,
                        url,
                        category,
                        source: dataSource.name
                    })   
                })                
            }

            if (dataSource.name === 'epicurious') {
                $('article[class="list_content_top recipe-tag-item"]').each(function () {
                    const title = $(this).find('div > a').attr('title');
                    const url = $(this).find('div > a').attr('href');
                    const category = 'dinner';
                    
                    dinnerRecipes.push({
                        title,
                        url: dataSource.base + url,
                        category,
                        source: dataSource.name
                    }) 
                })
            }

            if (dataSource.name === 'serious-eats') {
                $('a[class="comp card"]').each(function () {
                    const title = $(this).find('div.card__wrapper > div > span > span').text();
                    const url = $(this).attr('href');
                    const category = 'dinner';
                    
                    dinnerRecipes.push({
                        title,
                        url,
                        category,
                        source: dataSource.name
                    }) 
                })
            }

            if (dataSource.name === 'food-52') {
                $('div[class="card collectable"]').each(function () {
                    const title = $(this).find('div.card__details > h3 > a').text();
                    const url = $(this).find('div.card__details > h3 > a').attr('href');
                    const category = 'dinner';
                    
                    dinnerRecipes.push({
                        title,
                        url: dataSource.base + url,
                        category,
                        source: dataSource.name
                    }) 
                })
            }
    })
});

app.get('/', (req, res) => {
    res.json('Welcome to my Recipes API')
});

app.get('/recipes', (req, res) => {
    res.json('Welcome to my Recipes API')
});

app.get('/dinner/recipes', (req, res) => {
    res.json(dinnerRecipes);
});

app.get('/dinner/recipes/:sourceId', (req, res) => {
    const sourceId = req.params.sourceId;
    const sourceAddress = dataSources.filter(dataSource => dataSource.name == sourceId)[0].address.dinner;
    const sourceBase = dataSources.filter(dataSource => dataSource.name == sourceId)[0].base;

    axios.default(sourceAddress)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const specificRecipes = [];

            if (sourceId === 'all-recipes') {
                $('div[class="component card card__category"]', html).each(function () {
                    const title = $(this).find('div.card__detailsContainer > div > a').attr('title');
                    const url = $(this).find('div.card__detailsContainer > div > a').attr('href');
                    const category = 'dinner';

                    specificRecipes.push({
                        title,
                        url,
                        category,
                        source: sourceId
                    })
                })                
            }

            if (sourceId === 'skinny-taste') {
                $('div[class="archive-post first"]').find('a').each(function () {
                    const title = $(this).attr('title');
                    const url = $(this).attr('href');
                    const category = 'dinner';

                    specificRecipes.push({
                        title,
                        url,
                        category,
                        source: sourceId
                    })
                })
            }

            if (sourceId === 'simply-recipes') {
                $('a[class="comp mntl-card-list-items mntl-document-card mntl-card card"]').each(function () {
                    const title = $(this).find('div.card__content > span > span').text();
                    const url = $(this).attr('href');
                    const category = 'dinner';

                    specificRecipes.push({
                        title,
                        url,
                        category,
                        source: sourceId
                    })                    
                })
            }

            if (sourceId === 'my-recipes') {
                $('div[class="component card card__category"]').each(function () {
                    const title = $(this).find('div.card__detailsContainer > div > a').attr('title');
                    const url = $(this).find('div.card__detailsContainer > div > a').attr('href');
                    const category = 'dinner';

                    specificRecipes.push({
                        title,
                        url,
                        category,
                        source: sourceId
                    })   
                })                
            }

            if (sourceId === 'epicurious') {
                $('article[class="list_content_top recipe-tag-item"]').each(function () {
                    const title = $(this).find('div > a').attr('title');
                    const url = $(this).find('div > a').attr('href');
                    const category = 'dinner';
                    
                    specificRecipes.push({
                        title,
                        url: sourceBase + url,
                        category,
                        source: sourceId
                    }) 
                })
            }

            if (sourceId === 'serious-eats') {
                $('a[class="comp card"]').each(function () {
                    const title = $(this).find('div.card__wrapper > div > span > span').text();
                    const url = $(this).attr('href');
                    const category = 'dinner';
                    
                    specificRecipes.push({
                        title,
                        url,
                        category,
                        source: sourceId
                    }) 
                })
            }

            if (sourceId === 'food-52') {
                $('div[class="card collectable"]').each(function () {
                    const title = $(this).find('div.card__details > h3 > a').text();
                    const url = $(this).find('div.card__details > h3 > a').attr('href');
                    const category = 'dinner';
                    
                    specificRecipes.push({
                        title,
                        url: sourceBase + url,
                        category,
                        source: sourceId
                    }) 
                })
            }

            res.json(specificRecipes);
        })
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));