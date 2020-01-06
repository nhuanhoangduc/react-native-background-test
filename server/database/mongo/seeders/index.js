const accounts = require('./accounts');


(async function start() {
    await accounts();
    process.exit();
})();
