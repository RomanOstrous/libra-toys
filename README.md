# LibraToys

## General info
LibraToys is an online store of soft toys, which has a wide range of functions and uses modern technologies to create a convenient and attractive interface for users.

##  Link to the finished project:
  # [Demo Link](https://romanostrous.github.io/libra-toys/)
	
## Technologies
The following technologies were used to build this project:
* **React**: A JavaScript library for building user interfaces.
* **Redux Toolkit**: A package that provides simplified tools for managing state in React applications.
* **SCSS**: A CSS preprocessor that adds features like variables, mixins, and nesting to CSS.
* **BEM**: A naming convention for CSS classes that makes code more modular and easier to read.
* **TypeScript**: A statically typed superset of JavaScript that adds optional type annotations.
* **JavaScript**: The programming language used to build the frontend logic.

## Functionality:
* **Home page**: The home page implements a carousel with product cards that were added using the React Slick Carousel library.
* **Toys page**: On the page with product cards, a convenient interface with filters for searching for a specific product has been created.
* **Product details page**: When you click on the product card, the product details page opens.
* **Authorization and registration**: Implemented authorization and registration using JWT tokens, as well as through Google Auth,
also added password recovery options.
* **Personal account**: Users can manage their account, change data, view order history and use the functionality of the selected product and basket.
* **Cart**: On the cart page, users can create an order, choose a delivery method (including delivery by Nova Poshta) and pay.
* **Responsive design**: The project is adapted to different screen sizes to ensure ease of use on different devices.

## Getting Started
To get started with this project, you will need to have Node.js installed on your machine.

1. Clone the project to your local machine.
``` bash
git clone https://github.com/<your-username>/<your-repo-name>.git
```

2. Install the project dependencies by running the following command in the project directory:
```
npm install
```

3. Start the development server by running the following command:
```sql
npm start
```

4. Open the app in your web browser by navigating to http://localhost:3000.

## Project Structure

The project is structured as follows:

```java
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Component1/
│   │   │   ├── Component1.tsx
│   │   │   ├── Component1.scss
│   │   │   └── ...
│   │   ├── Component2/
│   │   │   ├── Component2.tsx
│   │   │   ├── Component2.scss
│   │   │   └── ...
│   │   └── ...
│   ├── pages/
│   │   ├── Page1/
│   │   │   ├── Page1.tsx
│   │   │   ├── Page1.scss
│   │   │   └── ...
│   │   ├── Page2/
│   │   │   ├── Page2.tsx
│   │   │   ├── Page2scss
│   │   │   └── ...
│   │   └── ...
│   ├── styles/
│   │   ├── index.scss
│   │   └── ...
│   ├── App.tsx
│   ├── index.tsx
│   └── ...
├── .eslintrc.js
├── package.json
├── tsconfig.json
└── ...

```
* The `public/` directory contains the public assets of the project, such as the index.html file and the api folder.

* The `src/ `directory contains the source code of the project.

* The `components/` directory contains reusable React components, each with its own .tsx file.

## Conclusion

This project demonstrates how to build a modern frontend application using React and related technologies. By using SCSS and BEM, we can write CSS that is more maintainable and easier to read. TypeScript adds type safety to our code, which makes it easier to catch bugs during development.Redux Toolkit simplifies the process of configuring Redux, with it we can efficiently manage complex state requirements, such as global application state or getting data from an API. This provides a more organized and scalable codebase, which makes maintenance and future improvements easier.

If you have any questions or feedback about this project, please feel free to reach out to the contributors. We hope this project inspires you to build your own frontend projects using the latest web technologies!
