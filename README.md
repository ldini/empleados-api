# API de Empleados con Serverless

La API de Empleados permite realizar operaciones básicas sobre la información de los empleados, como la creación, recuperación, actualización y eliminación de registros. Utilizamos AWS Lambda para ejecutar funciones sin servidor, lo que garantiza una escalabilidad eficiente y un costo optimizado.
Con la utilizando del framework Serverless para simplificar el despliegue y la gestión de las funciones Lambda y otros recursos en AWS. El archivo serverless.yml contiene la configuración principal del proyecto.

## Endpoints

A continuación, se detallan los endpoints disponibles en nuestra API:

GET /empleados: Recupera la lista completa de empleados.
GET /empleados/{id}: Recupera la información de un empleado específico por su ID.
POST /empleados: Crea un nuevo empleado.
PUT /empleados/{id}: Actualiza la información de un empleado existente.
DELETE /empleados/{id}: Elimina a un empleado según su ID.

### Ejemplo de uso

```bash
# Obtener la lista de empleados
curl -X GET https://url-base/empleados
```

```bash
# Obtener un empleado
curl -X GET https://url-base/empleados/{id}
```

```bash
# Crear un nuevo empleado
curl -X POST -H "Content-Type: application/json" -d '{"dni": "123456789", "nombre": "John Doe", "edad": 30, "cargo": "Desarrollador"}' https://url-base/empleados
```

```bash
# Actualizar la información de un empleado
curl -X PATCH -H "Content-Type: application/json" -d '{"nombre": "Nuevo Nombre", "edad": 31}' https://url-base/empleados/{id} 

#Y todas las posibles combinaciones!
```

```bash
# Eliminar a un empleado
curl -X DELETE https://url-base/empleados/{id}
```

### Deployment

### En caso de no tener Serverless instalado

Instalar Serverless
```
npm install -g serverless
```

Configurar dependencias de AWS
```
serverless config credentials --provider aws --key TU-CLAVE --secret TU-SECRET
```

Instalar dependencias:

```
npm install
```

y luego hacer el deploy:

```
serverless deploy
```


```

### Local development

It is also possible to emulate DynamoDB, API Gateway and Lambda locally using the `serverless-dynamodb-local` and `serverless-offline` plugins. In order to do that, run:

```bash
serverless plugin install -n serverless-dynamodb-local
serverless plugin install -n serverless-offline
```

It will add both plugins to `devDependencies` in `package.json` file as well as will add it to `plugins` in `serverless.yml`. Make sure that `serverless-offline` is listed as last plugin in `plugins` section:

```
plugins:
  - serverless-dynamodb-local
  - serverless-offline
```

You should also add the following config to `custom` section in `serverless.yml`:

```
custom:
  (...)
  dynamodb:
    start:
      migrate: true
    stages:
      - dev
```

Additionally, we need to reconfigure `AWS.DynamoDB.DocumentClient` to connect to our local instance of DynamoDB. We can take advantage of `IS_OFFLINE` environment variable set by `serverless-offline` plugin and replace:

```javascript
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
```

with the following:

```javascript
const dynamoDbClientParams = {};
if (process.env.IS_OFFLINE) {
  dynamoDbClientParams.region = 'localhost'
  dynamoDbClientParams.endpoint = 'http://localhost:8000'
}
const dynamoDbClient = new AWS.DynamoDB.DocumentClient(dynamoDbClientParams);
```

After that, running the following command with start both local API Gateway emulator as well as local instance of emulated DynamoDB:

```bash
serverless offline start
```

To learn more about the capabilities of `serverless-offline` and `serverless-dynamodb-local`, please refer to their corresponding GitHub repositories:
- https://github.com/dherault/serverless-offline
- https://github.com/99x/serverless-dynamodb-local
