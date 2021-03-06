/**
 * @title TenX
 * @symbol PAY
 * @ethContractAddr 0xb97048628db6b661d4c2aa833e95dbe1a905b280
 * @implementation Dynamic
 * @cmcId tenx
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0xb97048628db6b661d4c2aa833e95dbe1a905b280?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        var resp = {
            t: Number(body.totalSupply) * Math.pow(10, -18)
        };

        if (typeof body.price !== 'undefined' && typeof body.price.availableSupply !== 'undefined') {
            resp.c = Number(body.price.availableSupply);
        }

        callback(resp);
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};
