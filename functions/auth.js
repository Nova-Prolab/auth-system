const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    const file = event.queryStringParameters.file;
    
    const allowedFiles = {
        'users.txt': true,
        'config.bot.txt': true,
        'ban.list.txt': true
    };

    if (!file || !allowedFiles[file]) {
        return {
            statusCode: 404,
            body: 'Archivo no encontrado o no permitido'
        };
    }

    try {
        const filePath = path.join(process.cwd(), 'config', file);
        const data = fs.readFileSync(filePath, 'utf-8');
        
        return {
            statusCode: 200,
            body: data,
            headers: {
                'Content-Type': 'text/plain',
                'Cache-Control': 'no-store'
            }
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: `Error al leer el archivo: ${err.message}`
        };
    }
}; 
