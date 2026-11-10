# Outputs de la infraestructura de DynamoDB para gestión de órdenes
# Este archivo expone los valores de los recursos creados que son necesarios
# para la aplicación y para otras configuraciones de infraestructura.

output "dynamodb_table_arn" {
  description = "ARN completo de la tabla DynamoDB de órdenes"
  value       = module.dynamodb.dynamodb_table_arn
}

output "dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB de órdenes"
  value       = module.dynamodb.dynamodb_table_name
}

output "dynamodb_table_id" {
  description = "Identificador único de la tabla DynamoDB"
  value       = module.dynamodb.dynamodb_table_id
}

output "dynamodb_table_stream_arn" {
  description = "ARN del stream de DynamoDB para captura de cambios (CDC)"
  value       = module.dynamodb.dynamodb_table_stream_arn
  sensitive   = false
}

output "dynamodb_table_stream_label" {
  description = "Etiqueta del stream actual de DynamoDB"
  value       = module.dynamodb.dynamodb_table_stream_label
  sensitive   = false
}

output "dynamodb_table_endpoint" {
  description = "Endpoint de la tabla DynamoDB para conexiones directas"
  value       = "dynamodb.${var.aws_region}.amazonaws.com"
}

output "dynamodb_table_partition_key_name" {
  description = "Nombre de la clave de partición de la tabla"
  value       = module.dynamodb.dynamodb_table_partition_key_name
}

output "dynamodb_table_sort_key_name" {
  description = "Nombre de la clave de ordenación de la tabla"
  value       = module.dynamodb.dynamodb_table_sort_key_name
  nullable    = true
}

output "dynamodb_table_global_secondary_index_names" {
  description = "Nombres de los índices secundarios globales configurados"
  value       = module.dynamodb.dynamodb_table_global_secondary_index_names
}

output "dynamodb_table regional_secondary_index_names" {
  description = "Nombres de los índices secundarios locales configurados"
  value       = module.dynamodb.dynamodb_table_local_secondary_index_names
}

output "iam_role_arn" {
  description = "ARN del rol IAM con permisos de acceso a la tabla"
  value       = aws_iam_role.dynamodb_access.arn
}

output "iam_role_name" {
  description = "Nombre del rol IAM con permisos de acceso a la tabla"
  value       = aws_iam_role.dynamodb_access.name
}

output "dynamodb_kms_key_arn" {
  description = "ARN de la clave KMS usada para cifrado en reposo"
  value       = aws_kms_key.dynamodb_encryption.arn
}

output "dynamodb_backup_bucket_name" {
  description = "Nombre del bucket S3 para backups automáticos"
  value       = aws_s3_bucket.backups.id
}

output "dynamodb_backup_bucket_arn" {
  description = "ARN del bucket S3 para backups automáticos"
  value       = aws_s3_bucket.backups.arn
}

output "environment" {
  description = "Entorno de despliegue actual"
  value       = var.environment
}

output "aws_region" {
  description = "Región de AWS donde se desplegó la infraestructura"
  value       = var.aws_region
}

output "tags_applied" {
  description = "Tags aplicados a todos los recursos"
  value       = var.common_tags
}

output "terraform_workspace" {
  description = "Workspace de Terraform utilizado"
  value       = terraform.workspace
}