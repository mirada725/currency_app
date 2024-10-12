const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middle wares
app.use(express.json())
app.use(cors());

//all currencies
app.get("/getAllCurencies", async(req,res)=>{
    const nameURL = 'https://openexchangerates.org/api/currencies.json?app_id=974346e6fce046c482e5f03db6aee75a';
    
    const namesResponse = await axios.get(nameURL);
    const nameData = namesResponse.data;
    return res.json(nameData);
    try {
        
    } catch (err) {
        console.error(err);
    }
});
//get the target amount
app.get("/convert",async(req,res)=>{
    const {date,sourceCurrency,targetCurrency,amountInSourceCurrency} =
    req.query;
    try {
        const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=974346e6fce046c482e5f03db6aee75a`;
       const dataResponce= await axios.get(dataUrl);
        const rates=dataResponce.data.rates;

        //rates
        const souceRate=rates[sourceCurrency];
        const targetRate=rates[targetCurrency];

        //final target value
        const targetAmount=(targetRate/souceRate)*amountInSourceCurrency;

        return res.json(targetAmount.toFixed(2));
        
    } catch (err) {
        console.error(err);
    }
});

//listen to a port
app.listen(5000,()=>{
    console.log("Server Started");
})