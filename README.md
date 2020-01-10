# DrJohnson React

DrJohnson is an Electronic Medical Records application (scaled down). It was written to showcase technologies learned from my Flatiron school coding bootcamp experience, using Ruby on Rails api for model and controller, and React for the views.

## Configuration

- React Version 16.12.0

## React Project Creation

```bash
yarn create react-app frontend
```

## Wireframe

- Marvelapp.com

## Tasks

- [x] Scaffold Rails and React
- [ ] Models and Controllers
- [ ] Authentication and Roles
- [ ] Seed data
- [ ] ICD-10 Lookup/Download
- [ ] Photo for Profile
- [ ] Alexa Skill (?)

## Notes

2020-01-08

- Create custom Bulma theme using Sass

2020-01-09

```
yarn add bulma
yarn add node-sass
```

2020-01-10

- fun fact: if you make the prop name the same as your action name, then you can just do this

```
const mapDispatchToProps = {
  login
};
```

- I can store objects in local storage using JSON.stringify and JSON.parse

- redux and jwt: https://levelup.gitconnected.com/using-jwt-in-your-react-redux-app-for-authorization-d31be51a50d2
