# Branch Frontend Take-Home Assignment

Welcome to Andrew Johnson's Branch Frontend Take-Home Assignment!

## Getting Started

1. **Clone the Repo**: Start by forking this repository so that you have your own version to work with.
2. **Start the FE Client**:
  - In another terminal window run the following operations
  ```bash
  npm install
  npm run dev
  ```
3. **Navigate to localhost:5173**
  You should see something like this:
  ![Homepage](/src/assets/Todo%20Screenshot.png)


4. **Run the Tests** (optional) 
- In another terminal window run the following operations
  ```bash
  npm test
  ```

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- Typescript
- Vite
- TailwindCSS
- React Testing Library
- Vitest

## What would I do if I had more time? Or do differently?
 
I enjoyed the freedom to create a greenfield todo app and while it was a fun take home, there's always more to be done. There are several ways to modify/improve upon what's here

1. Add pagination for the todos once they reach a certain number

2. The fade-in animation is nice, but the stagger effect created with `animationDelay` is rudimentary, a more robust one would allow for the newly created todos to consistently take the same amount of time to appear. 

3. While I am proud of my submission, I know on the design front it could be better. I like working with designers, as they truly bring order from chaos, but am not yet one myself. There's room for me to grow here and I plan on doing it! I want future UIs I build to feel as smooth as mobile OS's like iOS and Android. There should be a fluidity to every interaction that keeps the context of a user's actions so that they dont get lost or confused. (This happens a lot in web applications)   

4. I wanted to add a subtly animated Branch green linear background to the `<main>` element but that would've required reworking the color scheme and font selection for the entire app to ensure that everything complemented each other for good UX.

5. Funcitonally, there's no sorting by time created, A-Z, completed state, etc.

6. Maybe addding a priority tile in the todo, (like High, Medium, Low)

7. Editing a todo after it's created could also be another bit of functionality

8. A todo completed/remaining counter