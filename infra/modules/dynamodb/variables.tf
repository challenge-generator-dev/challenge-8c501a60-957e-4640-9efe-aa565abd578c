# Input variables for the DynamoDB module
# These variables allow customization of the DynamoDB table
# configuration for different use cases.

variable "table_name" {
  description = "The name of the DynamoDB table"
  type        = string
}

variable "billing_mode" {
  description = "The billing mode for the DynamoDB table (PROVISIONED or PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"
  
  validation {
    condition     = contains(["PROVISIONED", "PAY_PER_REQUEST"], var.billing_mode)
    error_message = "Billing mode must be either PROVISIONED or PAY_PER_REQUEST"
  }
}

variable "read_capacity" {
  description = "The read capacity units for the DynamoDB table (only used when billing_mode is PROVISIONED)"
  type        = number
  default     = 5
}

variable "write_capacity" {
  description = "The write capacity units for the DynamoDB table (only used when billing_mode is PROVISIONED)"
  type        = number
  default     = 5
}

variable "hash_key" {
  description = "The hash key (partition key) for the DynamoDB table"
  type        = string
}

variable "range_key" {
  description = "The range key (sort key) for the DynamoDB table"
  type        = string
  default     = ""
}

variable "attributes" {
  description = "List of attribute definitions for the DynamoDB table"
  type = list(object({
    name = string
    type = string
  }))
}

variable "global_secondary_indexes" {
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
  default = []
}

variable "enable_point_in_time_recovery" {
  description = "Enable point-in-time recovery for the DynamoDB table"
  type        = bool
  default     = false
}

variable "enable_stream" {
  description = "Enable DynamoDB Streams for the table"
  type        = bool
  default     = false
}

variable "stream_view_type" {
  description = "When an item in the table is modified, what information is written to the stream"
  type        = string
  default     = "NEW_AND_OLD_IMAGES"
  
  validation {
    condition     = contains(["KEYS_ONLY", "NEW_IMAGE", "OLD_IMAGE", "NEW_AND_OLD_IMAGES"], var.stream_view_type)
    error_message = "Stream view type must be one of: KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES"
  }
}

variable "tags" {
  description = "A map of tags to assign to the DynamoDB table"
  type        = map(string)
  default     = {}
}

variable "ttl_attribute_name" {
  description = "The name of the TTL attribute for the DynamoDB table"
  type        = string
  default     = ""
}

variable "server_side_encryption_enabled" {
  description = "Enable server-side encryption for the DynamoDB table"
  type        = bool
  default     = true
}

variable "server_side_encryption_kms_key_arn" {
  description = "The ARN of the KMS key to use for server-side encryption"
  type        = string
  default     = ""
}