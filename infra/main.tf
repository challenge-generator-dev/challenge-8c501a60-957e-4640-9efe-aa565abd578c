# =============================================================================
# Configuración principal de recursos AWS para el sistema de pedidos
# Este archivo define la infraestructura core: tabla DynamoDB para órdenes
# y políticas IAM asociadas para acceso seguro
# =============================================================================

# -----------------------------------------------------------------------------
# Tabla DynamoDB para gestión de órdenes
# -----------------------------------------------------------------------------
resource "aws_dynamodb_table" "orders" {
  name           = var.orders_table_name
  billing_mode   = var.billing_mode
  hash_key       = "orderId"
  range_key      = "customerId"

  attribute {
    name = "orderId"
    type = "S"
  }

  attribute {
    name = "customerId"
    type = "S"
  }

  attribute {
    name = "status"
    type = "S"
  }

  attribute {
    name = "createdAt"
    type = "S"
  }

  attribute {
    name = "updatedAt"
    type = "S"
  }

  # GSI para consultas por cliente: permite obtener todas las órdenes de un cliente
  global_secondary_index {
    name            = "CustomerIdIndex"
    hash_key        = "customerId"
    range_key       = "createdAt"
    projection_type = "ALL"
    read_capacity   = var.gsi_read_capacity
    write_capacity  = var.gsi_write_capacity
  }

  # GSI para consultas por estado: permite filtrar órdenes por status
  global_secondary_index {
    name            = "StatusIndex"
    hash_key        = "status"
    range_key       = "createdAt"
    projection_type = "ALL"
    read_capacity   = var.gsi_read_capacity
    write_capacity  = var.gsi_write_capacity
  }

  # GSI para consultas por cliente y estado: combinación útil para soporte
  global_secondary_index {
    name            = "CustomerStatusIndex"
    hash_key        = "customerId"
    range_key       = "status"
    projection_type = "INCLUDE"
    non_key_attributes = ["orderId", "createdAt", "updatedAt", "totalAmount"]
    read_capacity   = var.gsi_read_capacity
    write_capacity  = var.gsi_write_capacity
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }

  tags = merge(
    var.common_tags,
    {
      Name        = "${var.orders_table_name}"
      Description = "Tabla de órdenes para el sistema de e-commerce"
      Component   = "orders"
      Environment = terraform.workspace
    }
  )

  lifecycle {
    prevent_destroy = false
  }
}

# -----------------------------------------------------------------------------
# Política IAM para acceso completo a la tabla de órdenes
# -----------------------------------------------------------------------------
resource "aws_iam_policy" "dynamodb_full_access" {
  name        = "${var.orders_table_name}-full-access"
  description = "Política de acceso completo a la tabla de órdenes de DynamoDB"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Resource = [
          aws_dynamodb_table.orders.arn,
          "${aws_dynamodb_table.orders.arn}/index/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:DescribeTable",
          "dynamodb:GetItem",
          "dynamodb:Scan"
        ]
        Resource = aws_dynamodb_table.orders.arn
      }
    ]
  })

  tags = merge(
    var.common_tags,
    {
      Name = "${var.orders_table_name}-full-access"
    }
  )
}

# -----------------------------------------------------------------------------
# Política IAM de solo lectura para soporte al cliente
# -----------------------------------------------------------------------------
resource "aws_iam_policy" "dynamodb_read_only" {
  name        = "${var.orders_table_name}-read-only"
  description = "Política de solo lectura para consultas de soporte al cliente"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:DescribeTable"
        ]
        Resource = [
          aws_dynamodb_table.orders.arn,
          "${aws_dynamodb_table.orders.arn}/index/*"
        ]
      }
    ]
  })

  tags = merge(
    var.common_tags,
    {
      Name = "${var.orders_table_name}-read-only"
    }
  )
}

# -----------------------------------------------------------------------------
# Política IAM para operaciones de procesamiento de pagos
# -----------------------------------------------------------------------------
resource "aws_iam_policy" "dynamodb_payment_processor" {
  name        = "${var.orders_table_name}-payment-processor"
  description = "Política específica para el servicio de procesamiento de pagos"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:UpdateItem",
          "dynamodb:GetItem"
        ]
        Resource = aws_dynamodb_table.orders.arn
        Condition = {
          ForAllValues:StringLikeIfExists = {
            "dynamodb:UpdateExpression" = ["SET #status = :newStatus"]
          }
        }
      }
    ]
  })

  tags = merge(
    var.common_tags,
    {
      Name = "${var.orders_table_name}-payment-processor"
    }
  )
}

# -----------------------------------------------------------------------------
# Bucket S3 para logs de auditoría
# -----------------------------------------------------------------------------
resource "aws_s3_bucket" "audit_logs" {
  bucket = "${var.project_name}-${terraform.workspace}-audit-logs"

  tags = merge(
    var.common_tags,
    {
      Name        = "${var.project_name}-${terraform.workspace}-audit-logs"
      Description = "Bucket para logs de auditoría del sistema de órdenes"
      Component   = "audit"
      Environment = terraform.workspace
    }
  )
}

resource "aws_s3_bucket_server_side_encryption_configuration" "audit_logs" {
  bucket = aws_s3_bucket.audit_logs.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_versioning" "audit_logs" {
  bucket = aws_s3_bucket.audit_logs.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_public_access_block" "audit_logs" {
  bucket = aws_s3_bucket.audit_logs.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# -----------------------------------------------------------------------------
# Exportar información de recursos creados
# -----------------------------------------------------------------------------
output "orders_table_name" {
  description = "Nombre de la tabla DynamoDB de órdenes"
  value       = aws_dynamodb_table.orders.name
}

output "orders_table_arn" {
  description = "ARN de la tabla DynamoDB de órdenes"
  value       = aws_dynamodb_table.orders.arn
}

output "audit_logs_bucket_name" {
  description = "Nombre del bucket de logs de auditoría"
  value       = aws_s3_bucket.audit_logs.id
}

output "dynamodb_full_access_policy_arn" {
  description = "ARN de la política de acceso completo a DynamoDB"
  value       = aws_iam_policy.dynamodb_full_access.arn
}

output "dynamodb_read_only_policy_arn" {
  description = "ARN de la política de solo lectura de DynamoDB"
  value       = aws_iam_policy.dynamodb_read_only.arn
}

output "dynamodb_payment_processor_policy_arn" {
  description = "ARN de la política de procesamiento de pagos"
  value       = aws_iam_policy.dynamodb_payment_processor.arn
}