# Input variables for the Terraform configuration
# These variables allow customization of the infrastructure
# deployment for different environments.

variable "aws_region" {
  description = "The AWS region where resources will be created"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "The deployment environment (dev, staging, prod)"
  type        = string
  default     = "dev"
  
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be one of: dev, staging, prod"
  }
}

variable "project_name" {
  description = "The name of the project, used for resource naming and tagging"
  type        = string
  default     = "ecommerce-orders"
}

variable "dynamodb_table_name" {
  description = "The name of the DynamoDB table for orders"
  type        = string
  default     = "Orders"
}

variable "dynamodb_billing_mode" {
  description = "The billing mode for the DynamoDB table (PROVISIONED or PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"
  
  validation {
    condition     = contains(["PROVISIONED", "PAY_PER_REQUEST"], var.dynamodb_billing_mode)
    error_message = "Billing mode must be either PROVISIONED or PAY_PER_REQUEST"
  }
}

variable "dynamodb_read_capacity" {
  description = "The read capacity units for the DynamoDB table (only used when billing_mode is PROVISIONED)"
  type        = number
  default     = 5
}

variable "dynamodb_write_capacity" {
  description = "The write capacity units for the DynamoDB table (only used when billing_mode is PROVISIONED)"
  type        = number
  default     = 5
}

variable "dynamodb_hash_key" {
  description = "The hash key (partition key) for the DynamoDB table"
  type        = string
  default     = "order_id"
}

variable "dynamodb_range_key" {
  description = "The range key (sort key) for the DynamoDB table"
  type        = string
  default     = ""
}

variable "dynamodb_attributes" {
  description = "List of attribute definitions for the DynamoDB table"
  type = list(object({
    name = string
    type = string
  }))
  default = [
    {
      name = "order_id"
      type = "S"
    },
    {
      name = "customer_id"
      type = "S"
    },
    {
      name = "order_date"
      type = "S"
    },
    {
      name = "status"
      type = "S"
    }
  ]
}

variable "dynamodb_global_secondary_indexes" {
  description = "List of global secondary indexes for the DynamoDB table"
  type = list(object({
    name               = string
    hash_key           = string
    range_key          = string
    projection_type    = string
    read_capacity      = number
    write_capacity     = number
    non_key_attributes = list(string)
  }))
  default = [
    {
      name               = "CustomerIndex"
      hash_key           = "customer_id"
      range_key          = "order_date"
      projection_type    = "INCLUDE"
      read_capacity      = 5
      write_capacity     = 5
      non_key_attributes = ["status", "total_amount"]
    },
    {
      name               = "StatusIndex"
      hash_key           = "status"
      range_key          = "order_date"
      projection_type    = "KEYS_ONLY"
      read_capacity      = 5
      write_capacity     = 5
      non_key_attributes = []
    }
  ]
}

variable "enable_dynamodb_point_in_time_recovery" {
  description = "Enable point-in-time recovery for the DynamoDB table"
  type        = bool
  default     = true
}

variable "enable_dynamodb_stream" {
  description = "Enable DynamoDB Streams for the table"
  type        = bool
  default     = true
}

variable "dynamodb_stream_view_type" {
  description = "When an item in the table is modified, what information is written to the stream"
  type        = string
  default     = "NEW_AND_OLD_IMAGES"
  
  validation {
    condition     = contains(["KEYS_ONLY", "NEW_IMAGE", "OLD_IMAGE", "NEW_AND_OLD_IMAGES"], var.dynamodb_stream_view_type)
    error_message = "Stream view type must be one of: KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES"
  }
}