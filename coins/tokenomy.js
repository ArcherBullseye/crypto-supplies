/**
 * @title Tokenomy
 * @symbol TEN
 * @ethContractAddr 0xdd16ec0f66e54d453e6756713e533355989040e4
 * @implementation Dynamic
 * @cmcId tokenomy
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0xdd16ec0f66e54d453e6756713e533355989040e4?apiKey=freekey', (error, response, body) => {
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
