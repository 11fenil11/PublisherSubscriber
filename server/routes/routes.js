const express = require('express')
const router = express.Router()
const axios = require("axios");

//router code here
router.get("/subscriber", async(req, res) =>{
    axios.get(
        "https://api.publicapis.org/entries"
    ).then((result)=>{     
        var categoryEntries = {};//dictionary of entries where key is category and value is 
        for( let i of result.data.entries){            
            i['HTTPS'] = i['HTTPS'] ? "True":"False";//converting boolean true/false to string for display purposes            
            //if key for category is already present then directly push object to that category 
            //else add new key for new category and add object to that key            
            if(categoryEntries.hasOwnProperty(i.Category)){                                 
                categoryEntries[i.Category].push(i);                
            }else{
                categoryEntries[i.Category] = [i];
            }            
        }        
        res.status(200).send(categoryEntries);//sending key-value pair of Category-entries as a result 
    }).catch((err)=>{
        res.status(404).send(err);//throwing error if any
    })
});

router.post("/publish", async(req, res) =>{
    axios.get(
        "https://api.publicapis.org/entries"
    ).then((result)=>{     
        var categoryEntries = {};//dictionary of entries where key is category and value is 
        for( let i of result.data.entries){            
            i['HTTPS'] = i['HTTPS'] ? "True":"False";//converting boolean true/false to string for display purposes            
            //if key for category is already present then directly push object to that category 
            //else add new key for new category and add object to that key            
            if(categoryEntries.hasOwnProperty(i.Category)){                                 
                categoryEntries[i.Category].push(i);                
            }else{
                categoryEntries[i.Category] = [i];
            }            
        }        
        res.status(200).send(categoryEntries);//sending key-value pair of Category-entries as a result 
    }).catch((err)=>{
        res.status(404).send(err);//throwing error if any
    })
});

module.exports = router
