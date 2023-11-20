const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const USERS_TABLE = process.env.USERS_TABLE;

module.exports.deletePerson = async (event) => {
    try {
        const db = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters;

        const params = {
            TableName: USERS_TABLE,
            Key: { id }
        };

        await db.delete(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Item deleted successfully' })
        };
    } catch (error) {
        console.error('Error deleting item:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting item' })
        };
    }
};
