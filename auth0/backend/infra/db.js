import dynamoose from 'dynamoose';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const ddb = new dynamoose.aws.ddb.DynamoDB({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

dynamoose.aws.ddb.set(ddb);

export default dynamoose;