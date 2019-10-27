const router = require('express').Router();
const Unsplash  = require('unsplash-js').default;
const fetch = require('node-fetch');
global.fetch = fetch;
require('dotenv/config');

 const unsplash = new Unsplash({
    accessKey:process.env.KEY
})

router.get('/',async (req,res)=>{

    // eval(require('locus'));

    if(req.query.search === undefined){
        console.log("Helllllllo")
    let data = await unsplash.photos.listPhotos(2,30,'wallpaper');
    let response = await data.json();

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
    }else{

        console.log(req.query.search)

        let data = await unsplash.search.photos(req.query.search,1);
        let response = await data.json();

    
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

    }

   
    
});


module.exports = router;