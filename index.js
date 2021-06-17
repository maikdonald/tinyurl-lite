const app = require('./app');
const configuration = require('./config/config')

const server = app.listen(configuration.port, () => {
    console.log(`Server running at http://${configuration.hostname}:${configuration.port}/`);
});