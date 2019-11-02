const router = require('express').Router();
const Unsplash  = require('unsplash-js').default;
const fetch = require('node-fetch');
const Axios = require('axios');
const fs = require('fs');
const path = require('path');
global.fetch = fetch;
require('dotenv/config');


    // Using unsplash api add your api key in order to get started 
    // Add api key in .env file 
    // or just simply replace process.env.KEY line with your key
 const unsplash = new Unsplash({
    accessKey:process.env.KEY //Relace this line or just create a .env file get your key at unsplash .com 
})




router.get('/',async (req,res)=>{

    //Locus is used for development purposes to freeze the code

    // eval(require('locus'));

    if(req.query.search === undefined){
        // console.log("Helllllllo")

    let data = await unsplash.photos.listPhotos(2,30,'wallpaper');
    let response = await data.json();

    // Uncommnet the below line in order to see the response from the unsplash
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

    
        // Mapping the result responses into session variables 
         req.session.images = {full,raw,small} = response.results.map(response =>{
            return {
                full:response.urls.full,
                raw:response.urls.raw,
                small:response.urls.small,    
                download : response.links.download,            
            }
    
        });
        
      
        res.render('index',{
            data:req.session.images
        })

    }

   
    
});


module.exports = router;