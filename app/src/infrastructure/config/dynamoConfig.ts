import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DynamoDBDocumentClientConfig } from '@aws-sdk/lib-dynamodb';
import * as dotenv from 'dotenv';

dotenv.config();

export interface DynamoConfig {
  client: DynamoDBDocumentClient;
  tableName: string;
  region: string;
}

function getClientConfig(): DynamoDBClientConfig {
  const config: DynamoDBClientConfig = {
    region: process.env.AWS_REGION || 'us-east-1',
  };

  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    config.credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    };
  }

  if (process.env.DYNAMODB_ENDPOINT) {
    config.endpoint = process.env.DYNAMODB_ENDPOINT;
  }

  if (process.env.AWS_MAX_ATTEMPTS) {
    config.maxAttempts = parseInt(process.env.AWS_MAX_ATTEMPTS, 10);
  }

  if (process.env.AWS_RETRY_MODE) {
    config.retryMode = process.env.AWS_RETRY_MODE as 'standard' | 'adaptive';
  }

  return config;
}

function getDocumentClientConfig(): DynamoDBDocumentClientConfig {
  const config: DynamoDBDocumentClientConfig = {
    marshallOptions: {
      removeUndefinedValues: true,
      convertClassInstanceToMap: true,
      convertTopLevelContainer: true,
    },
    unmarshallOptions: {
      wrapNumbers: false,
    },
  };

  return config;
}

export function createDynamoClient(): DynamoDBDocumentClient {
  const clientConfig = getClientConfig();
  const documentClientConfig = getDocumentClientConfig();
  
  const dynamoClient = new DynamoDBClient(clientConfig);
  const docClient = DynamoDBDocumentClient.from(dynamoClient, documentClientConfig);
  
  return docClient;
}

export function createDynamoConfig(): DynamoConfig {
  const client = createDynamoClient();
  const tableName = process.env.DYNAMODB_TABLE_NAME || 'orders';
  const region = process.env.AWS_REGION || 'us-east-1';
  
  return {
    client,
    tableName,
    region,
  };
}

export function validateDynamoConfig(): void {
  const requiredEnvVars = ['AWS_REGION'];
  const missingEnvVars: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missingEnvVars.push(envVar);
    }
  }

  if (missingEnvVars.length > 0) {
    console.warn(
      `Warning: Missing required environment variables: ${missingEnvVars.join(', ')}. ` +
      `Using default values. For local development, ensure .env file is properly configured.`
    );
  }
}

export const dynamoConfig = createDynamoConfig();
export const dynamoClient = dynamoConfig.client;
export const orderTableName = dynamoConfig.tableName;