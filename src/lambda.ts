import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import express, { Express, Request, Response } from 'express';

// Importa el módulo "app" que contiene toda tu aplicación Express
import  app  from './index';

// Crea una instancia de Express
const server: Express = express();

// Configura la ruta y los manejadores de solicitud
server.all('*', (req: Request, res: Response) => {
  app(req, res);
});

// Exporta la función de controlador para la función Lambda
const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { httpMethod, path, headers, queryStringParameters, body } = event;

  // Convierte el evento de la función Lambda en una solicitud de Express
  const req: Request = {
    method: httpMethod,
    path,
    headers,
    query: queryStringParameters,
    body: JSON.parse(body || '{}')
  } as Request;

  // Crea una respuesta de Express vacía
  const res: Response = {} as Response;

  // Ejecuta la aplicación Express y captura la respuesta
  await server(req, res);

  // Convierte la respuesta de Express en una respuesta de la función Lambda
  const response: APIGatewayProxyResult = {
    statusCode: res.statusCode || 200,
    headers: res.getHeaders() as any,
    body: JSON.stringify(res)
  };

  return response;
};
export default handler;