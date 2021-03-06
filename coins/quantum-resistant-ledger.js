/**
 * @title Quantum Resistant Ledger
 * @symbol QRL
 * @ethContractAddr 0x697beac28b09e122c4332d163985e8a73121b97f
 * @implementation Dynamic
 * @cmcId quantum-resistant-ledger
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x697beac28b09e122c4332d163985e8a73121b97f?apiKey=freekey', (error, response, body) => {
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
