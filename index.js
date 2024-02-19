const express = require('express');
const app = express();
const authRoutes = require('./routes/userRoutes');
const pictureRoutes = require('./routes/pictureRoutes');
app.use(express.json());

const connect = require('./config/db')
const cors = require('cors');
const PORT = process.env.PORT || 4500;
app.use(cors())
app.use('/auth', authRoutes);
app.use('/' ,pictureRoutes);


app.listen(PORT, async() => {
    await connect()
    console.log(`Server is running on port ${PORT}`);
});
