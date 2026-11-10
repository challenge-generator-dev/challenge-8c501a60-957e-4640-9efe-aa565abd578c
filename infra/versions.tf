terraform {
  required_version = ">= 1.9.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.67.0"
    }

    random = {
      source  = "hashicorp/random"
      version = "3.6.3"
    }
  }

  backend "s3" {
    bucket = "terraform-state-bucket-${var.environment}"
    key    = "infra/state.tfstate"
    region = "us-east-1"

    dynamodb_table = "terraform-state-lock"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      Project     = "ecommerce-orders"
      ManagedBy   = "terraform"
      Owner       = "platform-team"
    }
  }

  ignore_tags {
    keys = ["managed-by-terraform"]
  }
}

provider "aws" {
  alias  = "dynamodb"
  region = var.dynamodb_region

  default_tags {
    tags = {
      Environment = var.environment
      Project     = "ecommerce-orders"
      ManagedBy   = "terraform"
      Component   = "dynamodb"
    }
  }
}

variable "aws_region" {
  description = "Región primaria de AWS para recursos principales"
  type        = string
  default     = "us-east-1"
}

variable "dynamodb_region" {
  description = "Región para la tabla DynamoDB (puede ser diferente para redundancia)"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Entorno de despliegue (dev, staging, prod)"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "El entorno debe ser: dev, staging o prod."
  }
}

output "terraform_version" {
  description = "Versión de Terraform utilizada"
  value       = terraform.version
}

output "aws_provider_version" {
  description = "Versión del provider de AWS"
  value       = provider.aws.version
}