//Llamado a librerias
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
//App para usar metodos express - Puerto server
const app = express();
const port = 3000;

// Setting database
const connectionDB = mysql.createConnection
({
    //Defines DB data
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'BaseDatosArbolesFrutales'
});

//Configura el puerto para el servidor local
app.listen(port, function()
{
    console.log('El servidor en escucha es http://localhost:3000');
})
/*
//Ruta inicial
app.get('/', function(req,res)
{
    res.send('Hola mi gente');
})
*/
//Salida de la pagina estatica
app.use(express.static('public'));

//Conexion a la base de datos
connectionDB.connect(function(err)
{
    if(err)
    {
        connectionDB.end();
        throw err;        
    }
    console.log('Conexión a la base de datos exitosa.');
})

//Llamado de información de fruto a la BD
app.get('/fruto', (req,res) =>
{
    //Consulta SQL
    const queryFruto = 'SELECT * FROM fruto';

    connectionDB.query(queryFruto, (err, results) =>
    {
        if(err)
        {
            console.log('Error al consultar la base de datos.');
            throw err;            
        }

        //enviar la respuesta HTML al navegador
        res.json(results);      
    });    
});

//Llamado de información de arboles a la BD
app.get('/arboles', (req,res) =>
    {
        //Consulta SQL
        const queryArboles = 'SELECT * FROM arboles a, fruto f, taxonomia t WHERE f.id_Arbol_Arboles = a.id_Arbol AND t.id_Arbol_Arboles = a.id_Arbol;';
    
        connectionDB.query(queryArboles, (err, results) =>
        {
            if(err)
            {
                console.log('Error al consultar la base de datos.');
                throw err;            
            }
    
            //enviar la respuesta HTML al navegador
            res.json(results);      
        });    
    });

