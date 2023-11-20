const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const EMPLEADOS_TABLE = process.env.EMPLEADOS_TABLE;

exports.updateEmpleado = async (event) => {
  try {
    const { dni, nombre, edad, cargo } = JSON.parse(event.body);
    const id = event.pathParameters.id;

    const updateExpressionParts = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    if (dni !== undefined) {
      updateExpressionParts.push('#dni = :dni');
      expressionAttributeNames['#dni'] = 'dni';
      expressionAttributeValues[':dni'] = dni;
    }

    if (nombre !== undefined) {
      updateExpressionParts.push('#nombre = :nombre');
      expressionAttributeNames['#nombre'] = 'nombre';
      expressionAttributeValues[':nombre'] = nombre;
    }

    if (edad !== undefined) {
      updateExpressionParts.push('#edad = :edad');
      expressionAttributeNames['#edad'] = 'edad';
      expressionAttributeValues[':edad'] = edad;
    }

    if (cargo !== undefined) {
      updateExpressionParts.push('#cargo = :cargo');
      expressionAttributeNames['#cargo'] = 'cargo';
      expressionAttributeValues[':cargo'] = cargo;
    }

    const updateExpression = 'SET ' + updateExpressionParts.join(', ');

    const params = {
      TableName: EMPLEADOS_TABLE,
      Key: { id },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW', 
    };

    const result = await db.update(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
