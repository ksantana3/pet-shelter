# Pet Shelter

A small MERN app I built for managing pet profiles at an animal shelter. You can add pets with a photo, browse them, view details, edit them, "like" a pet, and adopt one (which removes it from the shelter list).

I built this while learning the MERN stack, and at one point I hosted it on AWS EC2. More of my work is at [kylesantana.com](https://kylesantana.com).

> **Status:** Archived portfolio project — not maintained; dependencies are outdated and it is not intended for deployment.

## Features

- List all pets, sorted by type, with a thumbnail, name and type
- Add a new pet (name, type, description, up to three skills, photo)
- View a pet's details and like count
- Edit a pet, including replacing its photo
- "Adopt Me!" deletes the pet; "Like Me!" increments its like count (once per page view)
- Server-side validation with Mongoose (name, type and description are required, 3+ characters), with errors shown in the form

Photos are read in the browser with `FileReader` and stored on the pet document as a base64 data URL, so there is no separate upload directory or file storage. The API accepts JSON bodies up to 1 MB, which caps image size.

## Tech stack

Versions are the ranges in `package.json`.

**Server** (`package.json`)

- Node.js + Express `^4.17.1`
- MongoDB via Mongoose `^5.6.0` (plus `mongoose-unique-validator` `^2.0.3`)
- `body-parser` `^1.19.0`, `cors` `^2.8.5`
- `nodemon` is used by `npm start` but is not listed as a dependency (install it globally or use `node server.js`)

**Client** (`client/package.json`)

- React `^16.8.6` / React DOM `^16.8.6` (Create React App, `react-scripts` `3.0.1`)
- React Router `^5.0.1` (`react-router-dom`)
- Axios `^0.19.0`

## Running locally

You need Node.js (an older LTS such as Node 10/12 matches these dependencies best) and a running MongoDB instance.

1. Install dependencies:

   ```bash
   npm install
   cd client && npm install
   ```

2. Build the React client (the Express server serves `client/build`):

   ```bash
   cd client
   npm run build
   ```

3. Start MongoDB locally (default `mongodb://localhost`), then start the server from the project root:

   ```bash
   npm start        # uses nodemon
   # or
   node server.js
   ```

4. Open http://localhost:8000.

### Environment variables

Both are optional:

| Variable      | Default                       | Purpose                         |
| ------------- | ----------------------------- | ------------------------------- |
| `MONGODB_URI` | `mongodb://localhost/petdb`   | MongoDB connection string       |
| `PORT`        | `8000`                        | Port the Express server listens on |

Example: `MONGODB_URI=mongodb://localhost/petdb PORT=8000 node server.js`

### Client dev server

`cd client && npm start` runs the CRA dev server on port 3000, but `client/package.json` has no `proxy` setting, so the relative `/api/...` calls won't reach Express from there. The simplest way to run the whole app is the build-and-serve flow above.

## API

| Method | Route            | Description        |
| ------ | ---------------- | ------------------ |
| GET    | `/api/pets`      | List all pets      |
| POST   | `/api/pets`      | Create a pet       |
| GET    | `/api/pets/:_id` | Get one pet        |
| PUT    | `/api/pets/:_id` | Update a pet       |
| DELETE | `/api/pets/:_id` | Delete (adopt) a pet |

Any other route returns the React app's `index.html`.

## Project structure

```
pet-shelter/
├── server.js                  # Express app: middleware, static client build, routes
├── server/
│   ├── controllers/pets.js    # CRUD handlers
│   ├── models/pet.js          # Mongoose Pet schema + validations
│   └── utils/
│       ├── mongoose.js        # DB connection (MONGODB_URI)
│       └── routes.js          # /api/pets routes
└── client/                    # Create React App front end
    ├── public/
    └── src/
        ├── App.js             # Layout + routes (/, /new, /pet/:_id, /edit/:_id)
        ├── Style.css
        └── Components/
            ├── List.js
            ├── New.js
            ├── View.js
            ├── Edit.js
            └── FileUpload.js  # Reads an image file into a data URL
```
