/**
 * @title Ace
 * @symbol ACE
 * @ethContractAddr 0x06147110022b768ba8f99a8f385df11a151a9cc8
 * @implementation Dynamic
 * @cmcId ace
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x06147110022b768ba8f99a8f385df11a151a9cc8?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -0)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};
