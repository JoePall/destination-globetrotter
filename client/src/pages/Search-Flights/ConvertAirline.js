// import React from "react";
// let airlinecode = '';

const airlines = [
  { mnemonic: "DL", name: "Delta Air Lines" },
  { mnemonic: "B6", name: "JetBlue Airways" },
  { mnemonic: "WN", name: "Southwest Airlines" },
  { mnemonic: "AS", name: "Alaska Airlines" },
  { mnemonic: "HA", name: "Hawaiian Airlines" },
  { mnemonic: "UA", name: "United Airlines" },
  { mnemonic: "NK", name: "Spirit Airlines" },
  { mnemonic: "AA", name: "American Airlines" },
  { mnemonic: "F9", name: "Frontier Airlines" },
];

function ConvertAirline(airlinecode) {
  // console.log("airlinecode inside ConvertAirline = ", airlinecode);
  // console.log(typeof(airlinecode));
  let index = airlines.findIndex((airline) => airline.mnemonic == airlinecode);
  // console.log("index = ", index);
  // console.log("Airline = ", airlines[index].name);
  let airlinename = airlines[index].name;
  return airlinename;
}

export default ConvertAirline;
