const request = require('request');
const URL_BASE = 'https://api.worldtradingdata.com/api/v1/stock?symbol='
const API_KEY = '&api_token=FYhfI6bhGRwrRtBTzAOM7djCWngHlnWhfDgyzF9gcRRlKoozGKI1DVZ1DwyA'

const cotacao = (symbol, callback) => {
    
    const url = `${URL_BASE}${symbol}${API_KEY}`;

    request({url, url, json: true }, (err, response) => {
        if (err) {
            callback({
                message: `Something went wrong: ${err}`
            }, undefined)
        } 

        if (response.body.data === undefined || response.body === undefined) {
            callback({
                message: `No data found`
            }, undefined);
        }
        // console.log(response.body.data[0])
        const dataParse = response.body.data[0];

        const { symbol, price, day_low, day_high } = dataParse;

        callback(undefined, { symbol, price, day_low, day_high })
    })
} 

module.exports = {cotacao};