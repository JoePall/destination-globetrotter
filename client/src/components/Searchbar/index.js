import React, { useState, setState, useEffect }from "react";
import moment from "moment";
const axios = require("axios");

const Searchbar = (returnfrom, dateto, fromairport, toairport, callback, errorcallback, sortby) => {
    
        let searchurl = "https://tequila-api.kiwi.com/v2/search?&curr=USD&select_airlines=DL,B6,WN,AS,HA,UA,NK,AA,F9&flight_type=round"
        // TODO: let apikey = process.env.KIWI_API;
        let apikey = "dRfNfRXhvDHSsgF7Got2L96r1cNGF9gl"
        let return_from = "&return_from=" + moment(returnfrom).format("DD/MM/YYYY");
        console.log("return_from = " + return_from);
        let return_to = "&return_to=" + moment(returnfrom).format("DD/MM/YYYY");
        let date_to = "&date_to=" + moment(dateto).format("DD/MM/YYYY");
        let date_from = "&date_from=" + moment(dateto).format("DD/MM/YYYY");
        let fly_from = "&fly_from=airport:" + fromairport.toUpperCase()
        let fly_to = "&fly_to=airport:" + toairport.toUpperCase()
        let sort = "&sort=" + sortby
        let asc = "&asc=" + "1"
        let surl = searchurl+date_to+date_from+return_to+return_from+fly_from+fly_to+sort+asc
            
          axios({
              "method":"GET",
              "url":surl,
              "headers":{
                  "apikey":apikey
              }
              })
              .then((response)=>{
                console.log("response.data.data from .then = ", response.data.data);
                  callback(response.data.data);
              })
              .catch((error)=>{
                errorcallback(error.response.data.message[0])
              })
      
        return (null);
      }

export default Searchbar