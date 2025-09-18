const app = require('./app')

// Asignación del puerto
app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () =>  console.log(`Arrancó por el puerto ${app.get('port')}`));
