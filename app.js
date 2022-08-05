import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url';
import path from 'path'

import hbs from 'hbs';
import {location} from './utils/geocode.js'
import {forecast} from './utils/forecast.js'
const app=express()



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var locations=path.join(__dirname,'/public')
app.set('views', path.join(__dirname, 'views'));
console.log(__dirname)
const partialsPath=path.join(__dirname,'/public/partials')
app.set('view engine','hbs')
app.use(express.static(locations))
hbs.registerPartials(partialsPath)
app.get('',(req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Ujjawal'
    })
   // res.send('<h1>Hello Express!</h1>')
})
app.get('/help',(req,res)=>{
    // res.send({
    //     name:'Ujjawal',
    //     job:'Developer'
    // })
    res.render('help',{
            name:'Ujjawal',
            title:'Help'
    })
})
app.get('/about',(req,res)=>{
   // res.send('<h1>About</h1> ')
   res.render('about',{
    name:'Ujjawal',
    title:'About'
   })
})
app.get('/weather',(req,res)=>{
    const query=req.query
    if(!query.address){
        return res.send({
            error:'Please Provide the address'
        })
    }
    location(query.address,(error, {latitude,longitude,place_name}={})=>{
   
        if(error){
         return res.send({error :error})
        }
        else{
        
          forecast(latitude,longitude,(data,error)=>{
            if(error){
                return res.send({error :error})
            }
            else{

                 
           return  res.send({
                place:place_name,
                location:query.address,
                forecast:data

            })
            }
        
       
           
        })
        }
    
      })
   
    
})
app.get('/products',(req,res)=>{
    const query=req.query
    if(!query.search){
       return res.send({
            error:'You must provide a search term',
            
        })
    }
    else{
        console.log(query)
        res.send({
        product:[]
    })  
    }

})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        error:'Help Article not Found',
        name:'Ujjawal',
        title:'404'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        error:'page not found',
        name:'Ujjawal',
        title:'404',
    })
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000 ')
})