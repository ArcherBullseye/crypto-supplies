/**
 * @title Privatix
 * @symbol PRIX
 * @ethContractAddr 0x3adfc4999f77d04c8341bac5f3a76f58dff5b37a
 * @implementation Dynamic
 * @cmcId privatix
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x3adfc4999f77d04c8341bac5f3a76f58dff5b37a?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -8)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};
