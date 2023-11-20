const AWS = require('aws-sdk');
const { v4 } = require('uuid');
const EMPLEADOS_TABLE = process.env.EMPLEADOS_TABLE;

module.exports.adddEmpleados = async (event) => {
  try {
      const db = new AWS.DynamoDB.DocumentClient();

      const { dni, nombre, edad, cargo } = JSON.parse(event.body);

      const createAt = new Date();
      const id = v4();

      const empleado = {
          id,
          dni,
          nombre,
          edad,
          cargo,
          createAt
      };

      await db.put({
          TableName: EMPLEADOS_TABLE,
          Item: empleado
      }).promise();

      return {
          statusCode: 200,
          body: JSON.stringify(empleado)
      };
  } catch (error) {
      console.error(error);

      return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Internal Server Error' })
      };
  }
};


