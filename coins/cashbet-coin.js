/**
 * @title CashBet Coin
 * @symbol CBC
 * @ethContractAddr 0x26DB5439F651CAF491A87d48799dA81F191bDB6b
 * @implementation Dynamic
 * @cmcId cashbet-coin
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x26DB5439F651CAF491A87d48799dA81F191bDB6b?apiKey=freekey', (error, response, body) => {
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
