# All about React

Training Guide:

- Essential Understanding: What are React Js and their benefits? What are core concepts?
- Learn about component-based development and how to create reusable components.
- Explore the framework's state management mechanisms.
- Learn State Container Redux.
- Practice JS tools in React project: Npm, Prettier, Eslint, Git.
- Client side routing in React with React-Router.
- Practice integrating APIs: CRUD operations.
- Practice Hooks in depth: useRef, useReducer, useMemo, useCallback.
- Practice integration of external libraries: MUI and Jest with npm.
- Special cases: Context and Portals.

Task 1: (Create your first react project)

- Create React application using 'create-react-app'.
- Write your first component, add markup with JSX
- Configure a component with Prop

Task 2: (Create re-usable functional components that can be used across multiple pages)

- Create Employee List and a form to add new employee for fields: name, joining date, designation. 
- Data should be in a state of functional component.
- Conditionaly render employee list, else display message 'No records.'
- On form Submit, Employee list should automatically get updated with new record.

Task 3: (State management with Redux and setup your project with Prettier, Eslint and Git)

- Implement Prettier, Eslint in your existing project as best practice for high quality code.

- Expand the earlier project with lifting the state in Redux.
- Configure Redux store to hold the employee data.
- Use this redux data for rest of the places and update the same from form submission.
- Employee list should get automatically as earlier.

Task 4: (Add routing and Practice integrating APIs)
- Setup routing with 'React-Router' in exisiting project.
- Add route 'Employee' and make it as a base route.
- Add new route 'Posts'. 
- Practice API integration to perform CRUD operations on Posts data. Make HTTP call with 'fetch'.
- Use routes from https://jsonplaceholder.typicode.com/.
- Make use of useRef, useReducer, useMemo, useCallback.

Task 5: (Integrate MUI and Jest)
- Install MUI with npm in exisiting project. 
- Integrate TextField, Table and Dialog MUI component.
- Setup your existing project with Jest.
- Write test cases for few components.

Task 6: (Context and Portal)
- Create a context for the logged-in user information.
- Use it to display in Header component.
- Create a Modal Popup with React Portal. Display it on button click.