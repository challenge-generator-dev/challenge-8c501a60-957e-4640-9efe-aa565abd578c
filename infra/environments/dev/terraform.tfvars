# Variables específicas del entorno de desarrollo
# Estas valores se cargan automáticamente cuando Terraform se ejecuta
# en el directorio environments/dev con el archivo terraform.tfvars

# Configuración del entorno
environment = "dev"
aws_region  = "us-east-1"

# Nombre base para los recursos (se añadirán sufijos automáticamente)
project_name = "ecommerce-orders"

# Configuración de la tabla DynamoDB
dynamodb_table_name = "orders-dev"
dynamodb_billing_mode = "PAY_PER_REQUEST"

# Capacidad bajo demanda (solo se usa si billing_mode es PROVISIONED)
read_capacity  = 5
write_capacity = 5

# Configuración de claves de la tabla
partition_key_name = "order_id"
partition_key_type = "S"

sort_key_name    = "customer_id"
sort_key_type    = "S"
enable_sort_key  = true

# Habilitar streams para captura de cambios
enable_dynamodb_streams = true
stream_view_type = "NEW_AND_OLD_IMAGES"

# Índices secundarios globales para consultas eficientes
gsi_config = [
  {
    name            = "CustomerOrdersIndex"
    partition_key  = "customer_id"
    sort_key       = "created_at"
    projection_type = "ALL"
    read_capacity  = 5
    write_capacity = 5
  },
  {
    name            = "StatusIndex"
    partition_key  = "status"
    sort_key       = "updated_at"
    projection_type = "ALL"
    read_capacity  = 5
    write_capacity = 5
  }
]

# Índices secundarios locales
lsi_config = [
  {
    name        = "OrderDateIndex"
    sort_key   = "order_date"
    projection_type = "KEYS_ONLY"
  }
]

# Configuración de seguridad
enable_server_side_encryption = true
kms_key_description = "Clave de cifrado para tabla DynamoDB de órdenes - DEV"
kms_key_deletion_window = 7

# Configuración de backups
enable_point_in_time_recovery = true
retention_days = 1

enable_s3_backup        = false
backup_bucket_prefix    = "dynamodb-backups"
backup_schedule         = "cron(0 5 ? * * *)"

# Configuración de TTL
enable_ttl                    = true
ttl_attribute_name            = "expiration_time"
ttl_delete_after_days         = 90

# Configuración de IAM
enable_iam_access = true
allowed_iam_principals = [
  "arn:aws:iam::123456789012:user/dev-user"
]

# Permisos específicos del rol IAM
iam_permissions = [
  "dynamodb:GetItem",
  "dynamodb:PutItem",
  "dynamodb:UpdateItem",
  "dynamodb:DeleteItem",
  "dynamodb:Query",
  "dynamodb:Scan",
  "dynamodb:DescribeTable",
  "dynamodb:GetRecords",
  "dynamodb:GetShardIterator"
]

# Tags estándar aplicados a todos los recursos
common_tags = {
  Environment  = "dev"
  Project      = "ecommerce-orders"
  ManagedBy    = "terraform"
  CostCenter   = "engineering"
  Team         = "platform"
  Compliance   = "pci-ready"
}

# Configuración de características avanzadas
enable_deletion_protection = false
enable_auto_scaling        = false

# Límites de throttle para protección
max_throttle_errors_per_second = 1000

# Configuración de logging
enable_cloudwatch_logs     = true
log_retention_days         = 7
log_level                  = "INFO"