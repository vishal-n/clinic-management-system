module.exports = app => {
    const clinics = require("../controllers/clinic.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Clinic
    router.post("/", clinics.create);
  
    // Retrieve all clinics
    router.get("/", clinics.findAll);
  
    // Retrieve a single Clinic with id
    router.get("/:id", clinics.findOne);
  
    // Update a Clinic with id
    router.put("/:id", clinics.update);
  
    // Delete a Clinic with id
    router.delete("/:id", clinics.delete);
  
    app.use("/api/clinics", router);
  };