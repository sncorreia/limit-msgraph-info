// const graphResponse = require("../utils/graphResponse");

// const assert = require('assert');

// const objectWithOData = {
//     "@odata.nextLink": "something",
//     value: "random"
// };
// const jsonWithOData = JSON.stringify(objectWithOData);

// const objectWithoutOData = {
//     value: "random"
// };
// const jsonWithoutOData = JSON.stringify(objectWithoutOData);


// describe('Test checkForNextPage function', () => {
//     it('should return true', () => {
//         console.log(jsonWithOData)
//         assert.strictEqual(graphResponse.checkForNextPage(jsonWithOData), true);
//     });
//     it('should return false', () => {
//         console.log(jsonWithoutOData)
//         assert.strictEqual(graphResponse.checkForNextPage(jsonWithoutOData), false);
//     });
// });