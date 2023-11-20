# API de Empleados con Serverless

La API de Empleados permite realizar operaciones básicas sobre la información de los empleados, como la creación, recuperación, actualización y eliminación de registros. Utilizamos AWS Lambda para ejecutar funciones sin servidor, lo que garantiza una escalabilidad eficiente y un costo optimizado.
Con la utilizando del framework Serverless para simplificar el despliegue y la gestión de las funciones Lambda y otros recursos en AWS. El archivo serverless.yml contiene la configuración principal del proyecto.

## Endpoints

A continuación, se detallan los endpoints disponibles en la API:

- GET /empleados: Recupera la lista completa de empleados.\n
- GET /empleados/{id}: Recupera la información de un empleado específico por su ID.\n
- POST /empleados: Crea un nuevo empleado.\n
- PUT /empleados/{id}: Actualiza la información de un empleado existente.\n
- DELETE /empleados/{id}: Elimina a un empleado según su ID.\n

## Deployment

En caso de no tener Serverless instalado

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

## Ejemplo de uso Post deploy

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


### Local development

También es posible emular DynamoDB, API Gateway y Lambda localmente utilizando los complementos serverless-dynamodb-local y serverless-offline. Para hacerlo, ejecuta:

```bash
serverless plugin install -n serverless-dynamodb-local
serverless plugin install -n serverless-offline
```

Esto añadirá ambos complementos a devDependencies en el archivo package.json y los incluirá en la sección plugins en serverless.yml. Asegúrate de que serverless-offline esté listado como el último complemento en la sección plugins:

```
plugins:
  - serverless-dynamodb-local
  - serverless-offline
```

También debes agregar la siguiente configuración a la sección custom en serverless.yml:

```
custom:
  (...)
  dynamodb:
    start:
      migrate: true
    stages:
      - dev
```

Adicionalmente, necesitamos reconfigurar AWS.DynamoDB.DocumentClient para que se conecte a nuestra instancia local de DynamoDB. Podemos aprovechar la variable de entorno IS_OFFLINE establecida por el complemento serverless-offline y reemplazar:

```javascript
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
```

con lo siguiente:

```javascript
const dynamoDbClientParams = {};
if (process.env.IS_OFFLINE) {
  dynamoDbClientParams.region = 'localhost'
  dynamoDbClientParams.endpoint = 'http://localhost:8000'
}
const dynamoDbClient = new AWS.DynamoDB.DocumentClient(dynamoDbClientParams);
```

Después de eso, ejecutar el siguiente comando iniciará tanto el emulador local de API Gateway como la instancia local de DynamoDB emulada:

```bash
serverless offline start
```

Para obtener más información sobre las capacidades de serverless-offline y serverless-dynamodb-local, consulta sus respectivos repositorios en GitHub:
- https://github.com/dherault/serverless-offline
- https://github.com/99x/serverless-dynamodb-local
