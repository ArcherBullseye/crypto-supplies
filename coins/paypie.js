/**
 * @title PayPie
 * @symbol PPP
 * @ethContractAddr 0xc42209aCcC14029c1012fB5680D95fBd6036E2a0
 * @implementation Dynamic
 * @cmcId paypie
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0xc42209aCcC14029c1012fB5680D95fBd6036E2a0?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -18)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};
