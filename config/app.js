
const API_BASE_PATH = 'http://localhost:3000';


module.exports = {
    api: {
        REST: {
            paths:  {
                base: API_BASE_PATH,
                dimensions: '/dimensions'
            },
            timeout: 10000
        }
    },
};