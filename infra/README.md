# Módulo de Infraestructura - DynamoDB para Órdenes

## Propósito

Este módulo define la infraestructura necesaria para gestionar órdenes de una plataforma de comercio electrónico utilizando Amazon DynamoDB como almacenamiento primario.

## Recursos Definidos

### Tabla DynamoDB
- **Nombre**: `orders-${var.environment}`
- **Tipo**: PAY_PER_REQUEST (onder demanda)
- **Partición clave**: `order_id` (String)
- **Orden de sort**: `created_at` (String - timestamp ISO 8601)

### Índice Secundario Global (GSI)
- **GSI1 - Por cliente**: Permite consultas por `customer_id`
- **GSI2 - Por estado**: Permite consultas por `status` con filtro de fecha
- **GSI3 - Por fecha de actualización**: Seguimiento de órdenes modificadas recientemente

### Políticas IAM
- Rol de aplicación con permisos de lectura/escritura condicionados
- Política de acceso con mínimo privilegio basada en el ID de orden
- Permisos para CloudWatch Logs y X-Ray

## Uso del Módulo

```hcl
module "infra" {
  source = "./infra"

  environment = "dev"
  aws_region  = "us-east-1"
  
  table_name             = "orders"
  billing_mode           = "PAY_PER_REQUEST"
  enable_point_in_time   = true
  enable_server_side_encryption = true
  
  tags = {
    CostCenter = "ecommerce"
  }
}
```

## Validación Local

### Requisitos Previos
- Terraform >= 1.9.0
- AWS CLI configurado con credenciales
- Provider de AWS versión 5.67.0

### Comandos de Validación

1. **Inicializar el backend y descargar providers**:
   ```bash
   cd infra
   terraform init
   ```

2. **Validar sintaxis y formato**:
   ```bash
   terraform validate
   ```

3. **Planificar cambios** (simula sin aplicar):
   ```bash
   terraform plan -var-file=../environments/dev/terraform.tfvars
   ```

4. **Aplicar infraestructura** (entorno dev):
   ```bash
   terraform apply -var-file=../environments/dev/terraform.tfvars
   ```

5. **Destruir recursos** (limpieza):
   ```bash
   terraform destroy -var-file=../environments/dev/terraform.tfvars
   ```

## Estructura de Archivos

```
infra/
├── versions.tf          # Configuración de providers y backend
├── README.md            # Este archivo
├── main.tf              # Definición de recursos principales
├── variables.tf         # Parámetros configurables
├── outputs.tf           # Valores exportados
└── modules/
    └── dynamodb/
        ├── main.tf
        ├── variables.tf
        └── outputs.tf
```

## Variables Principales

| Variable | Tipo | Default | Descripción |
|----------|------|---------|-------------|
| `environment` | string | - | Entorno (dev/staging/prod) |
| `aws_region` | string | us-east-1 | Región de AWS |
| `table_name` | string | orders | Nombre base de la tabla |
| `billing_mode` | string | PAY_PER_REQUEST | Modo de facturación |
| `enable_point_in_time` | bool | true | Recuperación a punto en tiempo |
| `enable_server_side_encryption` | bool | true | Cifrado en servidor |

## Outputs Exportados

- `table_name`: Nombre completo de la tabla DynamoDB
- `table_arn`: ARN de la tabla para permisos IAM
- `table_stream_arn`: ARN del stream para eventos (si está habilitado)
- `dynamodb_endpoint`: Endpoint de la tabla
- `region`: Región donde está desplegada la tabla

## Consideraciones de Seguridad

- El cifrado SSE-KMS usa CMK gestionada por AWS por defecto
- Point-in-time recovery habilitado para recuperación ante desastres
- TTL configurado para limpieza automática de registros antiguos
- Políticas IAM con acceso condicionadas por atributos de recurso

## Notas de Diseño

- El patrón de nombres `orders-{entorno}` permite entornos aislados
- GSI configurados para optimizar los patrones de consulta del dominio
- Modo de facturación on-demand para escalar sin configuración manual
- Tags obligatorios para trazabilidad y costeo en todas las cuentas