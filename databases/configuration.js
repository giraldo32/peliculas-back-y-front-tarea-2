const mongoose = require('mongoose');

const mongoConn = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
            await mongoose.connect(mongoUri, {
                dbName: 'pelis'
            });
        console.log('Conectado a MongoDB Atlas');
    } catch (error) {
        console.error('Error de conexión a MongoDB Atlas:', error);
        throw new Error('No se pudo conectar a Mongo');
    }
};

module.exports = { mongoConn };