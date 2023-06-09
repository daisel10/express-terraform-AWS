provider "aws" {
  region = "us-east-1"
}

// Crear una API en API Gateway v2
resource "aws_apigatewayv2_api" "entry_api_gateway" {
  name          = "express-typeScript"  // Nombre de la API
  protocol_type = "HTTP"         // Tipo de protocolo HTTP
}

resource "aws_apigatewayv2_integration" "lambda_integration_get" {
  api_id             = aws_apigatewayv2_api.entry_api_gateway.id
  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.example_lambda.invoke_arn
  integration_method = "GET"
}


// Crear una ruta en la API y asociarla con la integración
resource "aws_apigatewayv2_route" "route_apigateway_" {
  api_id    = aws_apigatewayv2_api.entry_api_gateway.id   // ID de la API
  route_key = "GET /apiv1/auth"                         // Ruta y método HTTP asociados (en este caso, GET /example)
  target    = "apiv1/auth/${aws_apigatewayv2_integration.lambda_integration_get.id}"  // ID de la integración
}


// Crear una etapa para la API
resource "aws_apigatewayv2_stage" "example_stage" {
  api_id      = aws_apigatewayv2_api.entry_api_gateway.id  // ID de la API
  name        = "production-stage"                      // Nombre de la etapa
  auto_deploy = true                                  // Implementar automáticamente la etapa al realizar cambios
}

// Crear una función Lambda
resource "aws_lambda_function" "example_lambda" {
  filename      = "../src/lambda.ts"      // Nombre del archivo ZIP que contiene el código de la función Lambda
  function_name = "handler"          // Nombre de la función Lambda
  role          = aws_iam_role.example_role.arn  // ARN del rol IAM asociado a la función Lambda
  handler       = "lambda.handler"           // Controlador de la función Lambda
  runtime       = "nodejs18.x"              // Entorno de ejecución de la función Lambda
}

// Crear un rol IAM para la función Lambda
resource "aws_iam_role" "example_role" {
  name = "example-role"  // Nombre del rol

  // Política de confianza para permitir a la función Lambda asumir el rol
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

  // Políticas administradas asociadas al rol
  managed_policy_arns = [
    "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  ]
}
