const fs = require("fs");
const path = require("path");

const prizesPath = path.join(__dirname, "./prizes.json");
const prizes = JSON.parse(fs.readFileSync(prizesPath));

module.exports = {
  getPrizes: (req, res) => {
    const availablePrizes = prizes.filter(
      (prize) => prize.stock === undefined || prize.stock > 0
    );
    res.json(availablePrizes);
  },
  claimPrize: (req, res) => {
    const { prizeName } = req.body;

    // Buscar el premio en el array
    const prizeIndex = prizes.findIndex((prize) => prize.option === prizeName);
    if (prizeIndex !== -1 && prizes[prizeIndex].stock > 0) {
      // Reducir el stock
      prizes[prizeIndex].stock -= 1;

      // Si el stock llega a 0, eliminar el premio
      if (prizes[prizeIndex].stock === 0) {
        prizes.splice(prizeIndex, 1);
      }

      // Guardar cambios en el archivo
      fs.writeFileSync(prizesPath, JSON.stringify(prizes, null, 2));
      res.json({ success: true, message: "Premio reclamado con éxito." });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Premio no disponible." });
    }
  },
};
