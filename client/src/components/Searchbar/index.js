// import React, { useState } from "react";
// import ResultsList from "./ResultsList"
const axios = require("axios");

const Search = async(datefrom, dateto, fromairport, toairport, callback) => {

    let searchurl = "https://tequila-api.kiwi.com/v2/search?&curr=USD"
    let apikey = "dRfNfRXhvDHSsgF7Got2L96r1cNGF9gl"
    let date_from = "&date_from=" + datefrom
    let date_to = "&date_to=" + dateto
    let fly_from = "&fly_from=airport:" + fromairport
    let fly_to = "&fly_to=airport:" + toairport
    let surl = searchurl+date_from+date_to+fly_from+fly_to

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
            console.log("this is the response from the promise = ", response.data.data)
            callback(response.data.data);
            // console.log("searchresults = ", searchresults)

        })
        .catch((error)=>{
            console.log(error)
        })
}

export default Search