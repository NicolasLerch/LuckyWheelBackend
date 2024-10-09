const cors = require('cors');
const express =  require('express');
const { env } = require('process');
const app = express();
const router = require('./src/routes/users.routes');
const prizesRoutes = require('./src/routes/prizes.routes')


const PORT = env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.use('/users', router);
app.use('/prizes', prizesRoutes);

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});