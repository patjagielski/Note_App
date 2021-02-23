const supertest = require("supertest");
const app = require("../app");

class Helper {
    constructor(model){
        this.apiServer=supertest(connection);
    }
}

module.exports = Helper;