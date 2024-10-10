const fs = require("fs");
const path = require("path");

const prizesPath = path.join(__dirname, "./prizes.json");
const prizes = JSON.parse(fs.readFileSync(prizesPath));

module.exports = {
  getPrizes: (req, res) => {
    res.json(prizes);
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
  updateStock: async function (req, res) {
    const { option } = req.body;
    try {
      // Buscar el premio y actualizar su stock
      const prize = prizes.find((p) => p.option === option);
      if (prize) {
        if (prize.stock > 0) {
          prize.stock -= 1;

          // Guardar los premios actualizados en el archivo JSON
          fs.writeFileSync(prizesPath, JSON.stringify(prizes, null, 2), "utf8");

          // Devolver los premios actualizados
          res.json({
            success: true,
            message: `Stock actualizado para ${option}.`,
            prizes,
          });
        } else {
          res
            .status(400)
            .json({ success: false, message: `Stock agotado para ${option}.` });
        }
      } else {
        res
          .status(404)
          .json({ success: false, message: "Premio no encontrado." });
      }
    } catch (error) {
      console.error("Error al actualizar el stock:", error);
      res
        .status(500)
        .json({ success: false, message: "Error interno del servidor." });
    }
  },
};
