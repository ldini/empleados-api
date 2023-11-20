const AWS = require('aws-sdk');

const EMPLEADOS_TABLE = process.env.EMPLEADOS_TABLE;

exports.getEmpleados = async () => {
  try {
    const db = new AWS.DynamoDB.DocumentClient();

    const result = await db.scan({
      TableName: EMPLEADOS_TABLE,
    }).promise();

    if (result.Items) {
      return {
        statusCode: 200,
        body: JSON.stringify(result.Items),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'No se encontraron empleados' }),
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


