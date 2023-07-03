const db = require("../models");
const Clinic = db.clinics;
const Op = db.Sequelize.Op;

// To create a new Clinic
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Clinic
    const clinic = {
      name: req.body.name,
      doctor: req.body.doctor,
      patient: req.body.patient,
      appointment: req.body.appointment
    };
  
    // Save Clinic in the database
    Clinic.create(clinic)
      .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error occurred while creating the Clinic."
        });
    });
};

// To retrieve all the Clinics
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { doctor: { [Op.iLike]: `%${name}%` } } : null;
  
    Clinic.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error occurred while retrieving clinics."
        });
      });
};

// Find a specific Clinic
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Clinic.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Clinic with id=" + id
        });
      });
};

// Update a Clinic by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Clinic.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Clinic was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Clinic with id=${id}. Maybe Clinic was not found or req.body is empty!`
          });
        }
    })
    .catch(err => {
        res.status(500).send({
        message: "Error updating Clinic with id=" + id
        });
    });
};


// Delete a Clinic with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Clinic.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Clinic was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Clinic with id=${id}. Maybe Clinic was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Clinic with id=" + id
        });
      });
};
