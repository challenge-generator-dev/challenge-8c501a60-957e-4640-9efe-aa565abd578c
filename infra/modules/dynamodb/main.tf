resource "aws_dynamodb_table" "this" {
  name           = var.table_name
  billing_mode   = var.billing_mode
  stream_enabled = var.enable_stream
  stream_view_type = var.stream_view_type

  dynamic "attribute" {
    for_each = var.attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  hash_key       = var.partition_key
  range_key      = var.sort_key

  dynamic "global_secondary_index" {
    for_each = var.gsi
    content {
      name            = gsi.value.name
      hash_key        = gsi.value.partition_key
      range_key       = try(gsi.value.sort_key, null)
      projection_type = try(gsi.value.projection_type, "KEYS_ONLY")
      read_capacity   = try(gsi.value.read_capacity, var.default_read_capacity)
      write_capacity  = try(gsi.value.write_capacity, var.default_write_capacity)
    }
  }

  dynamic "local_secondary_index" {
    for_each = var.lsi
    content {
      name       = lsi.value.name
      range_key  = lsi.value.sort_key
      projection_type = try(lsi.value.projection_type, "KEYS_ONLY")
    }
  }

  point_in_time_recovery {
    enabled = var.enable_pitr
  }

  ttl {
    enabled        = var.ttl_enabled
    attribute_name = var.ttl_attribute
  }

  server_side_encryption {
    enabled     = var.server_side_encryption
    kms_key_arn = var.kms_key_arn
  }

  tags = merge(
    var.tags,
    {
      "Name"        = var.table_name
      "Environment" = var.environment
      "ManagedBy"   = "Terraform"
      "Project"     = var.project
    }
  )

  lifecycle {
    ignore_changes = [tags]
  }
}

resource "aws_iam_role" "dynamodb_access" {
  count = var.create_iam_role ? 1 : 0
  name  = "${var.table_name}-access-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = ["lambda.amazonaws.com", "ecs-tasks.amazonaws.com"]
        }
      }
    ]
  })

  tags = var.tags
}

resource "aws_iam_policy" "dynamodb_table_access" {
  count = var.create_iam_role ? 1 : 0
  name  = "${var.table_name}-table-access"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:DescribeTable"
        ]
        Resource = [
          aws_dynamodb_table.this.arn,
          "${aws_dynamodb_table.this.arn}/index/*"
        ]
      }
    ]
  })

  tags = var.tags
}

resource "aws_iam_role_policy_attachment" "dynamodb_access_attachment" {
  count      = var.create_iam_role ? 1 : 0
  role       = aws_iam_role.dynamodb_access[0].name
  policy_arn = aws_iam_policy.dynamodb_table_access[0].arn
}

resource "aws_dynamodb_table_replica" "replica" {
  count = var.replica_regions != [] ? length(var.replica_regions) : 0
  provider = aws.replica
  table_name = aws_dynamodb_table.this.name
  region = var.replica_regions[count.index]
}