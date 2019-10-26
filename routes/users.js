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

    // console.log(response);
     req.session.images = {full,raw,small} = response.map(response =>{
        return {
            full:response.urls.full,
            raw:response.urls.raw,
            small:response.urls.small,
        }
    });


    res.render("index",{
        data:req.session.images
    });
    
});

router.post('/',async (req,res)=>{
    console.log(req.body.keyword);
    let data = await unsplash.search.photos(req.body.keyword,1);
    let response = await data.json();

    // console.log(response.results);

    // res.send(response.results[0].urls);

     req.session.images = {full,raw,small} = response.results.map(response =>{
        return {
            full:response.urls.full,
            raw:response.urls.raw,
            small:response.urls.small,
        }

    });

    res.render('index',{
        data:req.session.images
    })
    
})

module.exports = router;