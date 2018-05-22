import express from 'express';
import { Component } from 'syringe';

@Component({
  name: 'MainRouter',
  dependencies: [
    'ExpressApp',
  ],
})
export default class Router {
  router = express.Router();

  constructor(expressApp) {
    this.setUpRouter();
    expressApp.application.use(this.router);
  }

  setUpRouter() {
    this.router.get('/:name', this.greeter);
  }

  greeter = (req, res) => {
    res.send(`Hello ${req.params.name}`);
  }
}