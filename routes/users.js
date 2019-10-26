const router = require('express').Router();
const Unsplash  = require('unsplash-js').default;
const fetch = require('node-fetch');
global.fetch = fetch;
require('dotenv/config');

 const unsplash = new Unsplash({
    accessKey:process.env.KEY
})

router.get('/',async (req,res)=>{

    let data = await unsplash.photos.listPhotos(2,30,'wallpaper');
    let response = await data.json();

    console.log(response);
    let images = {full,raw,small} = response.map(response =>{
        return {
            full:response.urls.full,
            raw:response.urls.raw,
            small:response.urls.small,
        }
    });

    res.render("index",{
        data:images
    })
    
});


module.exports = router;