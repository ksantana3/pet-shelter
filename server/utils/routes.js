const Pets = require('../controllers/pets');

module.exports = (app) => {
    app.get("/api/pets", Pets.getAll);
    app.post("/api/pets", Pets.create);
    app.get("/api/pets/:_id", Pets.getOne);
    // app.post("/api/view/:_id", Pets.view);
    app.put("/api/pets/:_id", Pets.update);
    app.delete("/api/pets/:_id", Pets.delete);
    
}