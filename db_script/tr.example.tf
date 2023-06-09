provider "aws" {
  region = "us-east-1"
}

// Crear una API en API Gateway v2
resource "aws_apigatewayv2_api" "entry_api_gateway" {
  name          = "express-typeScript"  // Nombre de la API
  protocol_type = "HTTP"         // Tipo de protocolo HTTP
}

// Definir la integración con una función Lambda
resource "aws_apigatewayv2_integration" "lambda_integration_post" {
  api_id             = aws_apigatewayv2_api.entry_api_gateway.id     // ID de la API
  integration_type   = "AWS_PROXY"                             // Tipo de integración (en este caso, con una función Lambda)
  integration_uri    = aws_lambda_function.example_lambda.invoke_arn  // ARN de invocación de la función Lambda
  integration_method = "POST"                                  // Método HTTP para la integración
}

resource "aws_apigatewayv2_integration" "lambda_integration_get" {
  api_id             = aws_apigatewayv2_api.entry_api_gateway.id
  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.example_lambda.invoke_arn
  integration_method = "GET"
}

resource "aws_apigatewayv2_integration" "lambda_integration_put" {
  api_id             = aws_apigatewayv2_api.entry_api_gateway.id
  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.example_lambda.invoke_arn
  integration_method = "PUT"
}

resource "aws_apigatewayv2_integration" "lambda_integration_delete" {
  api_id             = aws_apigatewayv2_api.entry_api_gateway.id
  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.example_lambda.invoke_arn
  integration_method = "DELETE"
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
  name        = "example-stage"                      // Nombre de la etapa
  auto_deploy = true                                  // Implementar automáticamente la etapa al realizar cambios
}

// Crear una función Lambda
resource "aws_lambda_function" "example_lambda" {
  filename      = "example_lambda.zip"      // Nombre del archivo ZIP que contiene el código de la función Lambda
  function_name = "example-lambda"          // Nombre de la función Lambda
  role          = aws_iam_role.example_role.arn  // ARN del rol IAM asociado a la función Lambda
  handler       = "index.handler"           // Controlador de la función Lambda
  runtime       = "nodejs18.13.0"              // Entorno de ejecución de la función Lambda
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
