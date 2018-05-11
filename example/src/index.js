import { Bootstrap, Injector } from 'syringe';
import path from 'path';
import express from 'express';

@Bootstrap({
  scan: [
    path.resolve(__dirname, 'components/**/*'),
  ],
})
class Application {
  static main() {
    console.log('Application bootstrapped');
    Injector.get('ExpressApp').start();
  }
}
