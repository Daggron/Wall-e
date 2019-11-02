const router = require('express').Router();
const Unsplash  = require('unsplash-js').default;
const fetch = require('node-fetch');
const Axios = require('axios');
const fs = require('fs');
const path = require('path');
global.fetch = fetch;
require('dotenv/config');


 const unsplash = new Unsplash({
    accessKey:process.env.KEY
})




router.get('/',async (req,res)=>{

    // eval(require('locus'));

    if(req.query.search === undefined){
        // console.log("Helllllllo")

    let data = await unsplash.photos.listPhotos(2,30,'wallpaper');
    let response = await data.json();

    // console.log(response);

     req.session.images = {full,raw,small} = await response.map(response =>{
        return {
            full:response.urls.full,
            raw:response.urls.raw,
            small:response.urls.small,
            download : response.links.download,
        }
    });

    res.render("index",{
        data:req.session.images,
    });
    }else{

        // console.log(req.query.search)

        let data = await unsplash.search.photos(req.query.search,1);
        let response = await data.json();

    
         req.session.images = {full,raw,small} = response.results.map(response =>{
            return {
                full:response.urls.full,
                raw:response.urls.raw,
                small:response.urls.small,    
                download : response.links.download,            
            }
    
        });
        
        // downloadImage(req.session.images[0].download);
      
        res.render('index',{
            data:req.session.images
        })

    }

   
    
});


module.exports = router;