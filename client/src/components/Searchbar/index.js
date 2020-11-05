// import React, { useState } from "react";
// import ResultsList from "./ResultsList"
const axios = require("axios");

const Searchbar = async(returnfrom, dateto, fromairport, toairport, callback) => {

    let searchurl = "https://tequila-api.kiwi.com/v2/search?&curr=USD&select_airlines=DL,B6,WN,AS,HA,UA,NK,AA,F9&flight_type=round"
    let apikey = "dRfNfRXhvDHSsgF7Got2L96r1cNGF9gl"
    let return_from = "&return_from=" + returnfrom
    let return_to = "&return_to=" + returnfrom
    let date_to = "&date_to=" + dateto
    let date_from = "&date_from=" + dateto
    let fly_from = "&fly_from=airport:" + fromairport
    let fly_to = "&fly_to=airport:" + toairport
    let surl = searchurl+date_to+date_from+return_to+return_from+fly_from+fly_to

    axios({
        "method":"GET",
        "url":surl,
        "headers":{
            "apikey":apikey
        }
        })
        .then((response)=>{
            // console.log("url = ", {surl})
            // console.log("headers = ", {apikey})
            console.log("this is the response from the promise = ", response.data.data);
            callback(response.data.data);
            // console.log("searchresults = ", searchresults)

        })
        .catch((error)=>{
            console.log(error)
        })
}

export default Searchbar