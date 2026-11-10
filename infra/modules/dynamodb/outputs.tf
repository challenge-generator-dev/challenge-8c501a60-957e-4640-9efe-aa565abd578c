output "table_name" {
  description = "Nombre de la tabla DynamoDB de órdenes"
  value       = aws_dynamodb_table.orders_table.name
}

output "table_arn" {
  description = "ARN de la tabla DynamoDB de órdenes"
  value       = aws_dynamodb_table.orders_table.arn
}

output "table_id" {
  description = "ID único de la tabla DynamoDB de órdenes"
  value       = aws_dynamodb_table.orders_table.id
}

output "table_stream_arn" {
  description = "ARN del stream de DynamoDB para procesamiento de eventos"
  value       = aws_dynamodb_table.orders_table.stream_arn
}

output "table_stream_label" {
  description = "Etiqueta del stream de DynamoDB"
  value       = aws_dynamodb_table.orders_table.stream_label
}

output "table_endpoint" {
  description = "Endpoint de la tabla DynamoDB"
  value       = "https://dynamodb.${var.region}.amazonaws.com"
}

output "tags" {
  description = "Tags aplicados a la tabla DynamoDB"
  value       = aws_dynamodb_table.orders_table.tags
}

output "billing_mode" {
  description = "Modo de facturación de la tabla (PAY_PER_REQUEST o PROVISIONED)"
  value       = aws_dynamodb_table.orders_table.billing_mode
}

output "deletion_protection_enabled" {
  description = "Indica si la protección contra eliminación está habilitada"
  value       = aws_dynamodb_table.orders_table.deletion_protection_enabled
}

output "read_capacity" {
  description = "Capacidad de lectura aprovisionada (si aplica)"
  value       = aws_dynamodb_table.orders_table.read_capacity
}

output "write_capacity" {
  description = "Capacidad de escritura aprovisionada (si aplica)"
  value       = aws_dynamodb_table.orders_table.write_capacity
}

output "global_secondary_indexes" {
  description = "Índices secundarios globales configurados en la tabla"
  value       = { for gsi in aws_dynamodb_table.orders_table.global_secondary_index : gsi.name => {
    hash_key       = gsi.hash_key
    range_key      = gsi.range_key
    projection_type = gsi.projection_type
    read_capacity  = gsi.read_capacity
    write_capacity = gsi.write_capacity
  }}
}

output "local_secondary_indexes" {
  description = "Índices secundarios locales configurados en la tabla"
  value       = { for lsi in aws_dynamodb_table.orders_table.local_secondary_index : lsi.name => {
    range_key       = lsi.range_key
    projection_type = lsi.projection_type
  }}
}