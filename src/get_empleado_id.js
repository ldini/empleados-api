const AWS = require('aws-sdk');

const EMPLEADOS_TABLE = process.env.EMPLEADOS_TABLE;

exports.getEmpleadoId = async (event) => {
  try {
    const db = new AWS.DynamoDB.DocumentClient();

    const id = event.pathParameters.id;

    const result = await db.get({
      TableName: EMPLEADOS_TABLE,
      Key: { id },
    }).promise();

    if (result.Item) {
      return {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'No se encontro empleado' }),
      };
    }
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
