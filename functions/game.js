const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    const requestedPath = event.queryStringParameters.path;
    
    if (!requestedPath) {
        return {
            statusCode: 404,
            body: 'Ruta no especificada'
        };
    }

    try {
        const filePath = path.join(process.cwd(), 'games', requestedPath);
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
            statusCode: 404,
            body: `Archivo no encontrado: ${requestedPath}`
        };
    }
};
