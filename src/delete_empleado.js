const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const EMPLEADOS_TABLE = process.env.EMPLEADOS_TABLE;

module.exports.deleteEmpleado = async (event) => {
    try {
        const db = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters;

        const params = {
            TableName: EMPLEADOS_TABLE,
            Key: { id }
        };

        await db.delete(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Empleado eliminado' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al eliminar' })
        };
    }
};
