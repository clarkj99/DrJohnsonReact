# DrJohnson React-Frontend

![DrJohnson Micro EMR by Clark Johnson  ](./src/images/DrJohnson-screenshot.png?raw=true "DrJohnson")

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
- [x] Models and Controllers
- [x] Authentication and Roles
- [x] Seed data
- [x] Search bar
- [x] Admin Page to add new providers
- [x] ICD-10 Lookup/Download
- [x] Photo for Profile
- [ ] Video chat
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

2020-01-14

- Implemented forms by creating rails models for each form view.
- Added steps navigation for encounter using bulma-steps. I had to create my own implementation in Rails, without the included javascript. Manage classes is-active, is-complete, is-success

2020-01-15

- Remember to create child models with user and encounter
- Added search bar. Loaded user in state, then searched first name and last name using Array.includes().

2020-01-16

- process for creating a new encounters form:

  - create new JSX component for the form (Intake.jsx)
  - add component to `EncounterEdit.jsx`
  - use updateEncounterChild action for updates
  - add fields to component

- using `<input type="datetime-local" />` presented a challenge. Fortunately my coach suggested using `moment.js`

2020-01-17

- added photo booth to user profile component, using a react component `react-html5-camera-photo`.

2020-01-20

- Used withRouter and props.history.push to navigate programatically
- Can't just do boolean check for an object. `!!{}` returns true. Use `Object.getOwnPropertyNames(this.props.selectedEncounter).length !== 0`

2020-01-21

- major refactor: used single imported function for all fetches.

2020-02-06

- added `debounce` to ICD10 lookup in Diagnosis.jsx

```
debounceSearch = e => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value });
    debounce(
      e => {
        this.handleSearchChange(e);
      },
      900,
      {
        leading: false
      }
    )(e);
  };
```

- I needed e.persist() so React wouldn't reuse the synthetic event.
- I had to invoke the debounced function instead of returning it.
