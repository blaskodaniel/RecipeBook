# Szakacskonyv

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.25.5.

## 1. Running server
Run `npm run server`. Before install `npm install -g nodemon`. Navigate to `http://localhost:3100/`.

## 2. Running application
Run `npm start`

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build the application
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

Before build set the following: http://myurl.com/ instead of http://localhost:3000/
- src/app/create/create.components.ts => const uploadURL = 'http://myurl.com/upload';
- server/app.js => res.header("Access-Control-Allow-Origin", "http://myurl.com/");
- app.module.ts --> import { DisplayComponent } from './recipedisplay/display.component';


Ideas (for design):
- http://meridianthemes-demo.net/view/?theme=meridian-recipes
- http://themes.muffingroup.com/be/goodfood/food-blog/

## Dependeces
typings install dt~jquery --global --save
tsd install jquery --save
npm install -g nodemon

## Tutorials
Moment:
https://github.com/urish/angular2-moment

