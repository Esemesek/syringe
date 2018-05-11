import { Component } from 'syringe';
import express from 'express';

@Component({
  name: 'ExpressApp',
})
export default class ExpressApp {
  application = express();

  constructor() {
    this.application.get('/', (req, res) => res.send('Hello World'));
  }

  start = () => {
    this.application.listen(8080, () => console.log('Application is listening on port 8080'));
  }
}
