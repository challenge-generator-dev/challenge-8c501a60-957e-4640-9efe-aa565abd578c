# Terraform configuration for AWS provider
# This file declares the required providers and their versions
# to ensure consistent infrastructure provisioning.

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.67.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = var.aws_region
  
  # Default tags for all resources
  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.project_name
      Terraform   = "true"
    }
  }
}

# Additional provider configuration for us-east-1
# Required for global services like ACM certificates
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
  
  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.project_name
      Terraform   = "true"
    }
  }
}

# Local values for common configurations
locals {
  common_tags = {
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "Terraform"
  }
}

# Output the AWS account ID for reference in other modules
output "aws_account_id" {
  description = "The AWS Account ID"
  value       = data.aws_caller_identity.current.account_id
}

# Get the current AWS account identity
data "aws_caller_identity" "current" {}

# Output the current AWS region
output "aws_region" {
  description = "The AWS region being used"
  value       = var.aws_region
}