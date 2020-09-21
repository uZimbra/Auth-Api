"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.get('/', function (request, response) {
    return response.send({ message: "gg!" });
});
app.listen(3333, function () {
    console.log('http://localhost:3333/');
});
