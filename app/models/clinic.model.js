module.exports = (sequelize, Sequelize) => {
    const Clinic = sequelize.define("clinic", {
      name: {
        type: Sequelize.STRING
      },
      doctor: {
        type: Sequelize.STRING
      },
      patient: {
        type: Sequelize.STRING
      },
      appointment: {
        type: Sequelize.STRING
      }
    });
  
    return Clinic;
  };