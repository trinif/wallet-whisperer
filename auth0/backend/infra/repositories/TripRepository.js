import dotenv from 'dotenv'; 
import dynamoose from 'dynamoose';
import { createTripFromLocations } from '../../application/utils/geolocationUtil';
import s3 from '../s3';

const createFolder = async (userId, folderName='trips', bucketName = process.env.AWS_BUCKET_NAME) => {
    try {
        const folderKey = `${userId}-${folderName}/`;

        try {
            const existingFolder = await s3.headObject({ Bucket: bucketName, Key: folderKey });
            console.log(`Folder '${folderKey}' already exists`);
            throw new Error('Folder already exists');
        } catch (headErr) {
            if (headErr.code !== 'NotFound') {
                throw headErr;
            }
            const params = {
                Bucket: bucketName,
                Key: folderKey,
                Body: ''
            };
            const response = await s3.putObject(params);
            console.log(`Folder '${folderKey}' created successfully`);
            return response;
        }
    } catch (error) {
        console.error(`Error creating folder '${folderName}':`, error);
        throw error;
    }
};

const listFiles = async (userId, folderName='trips', bucketName = process.env.AWS_BUCKET_NAME) => {
    try {
        const folderKey = `${userId}-${folderName}/`;
        const response = await s3.listObjectsV2({
            Bucket: bucketName,
            Prefix: folderKey
        });
        
        return response.Contents;
    } catch (error) {
        console.error(`Error listing files for user ${userId}:`, error);
        throw error;
    }
};

const uploadFile = async (userId, fileName, fileData, folderName='trips', bucketName = process.env.AWS_BUCKET_NAME) => {
    try {
        const folderKey = `${userId}-${folderName}/`;
        const response = await s3.putObject({
            Bucket: bucketName,
            Key: `${folderKey}${fileName}`,
            Body: fileData
        });
        return response;
    } catch (error) {
        console.error(`Error uploading file ${fileName} for user ${userId}:`, error);
        throw error;
    }
};

const downloadFile = async (userId, fileName, folderName='trips', bucketName = process.env.AWS_BUCKET_NAME) => {
    try {
        const folderKey = `${userId}-${folderName}/`;
        const response = await s3.getObject({
            Bucket: bucketName,
            Key: `${folderKey}${fileName}`
        });
        return response.Body;
    } catch (error) {
        console.error(`Error downloading file ${fileName} for user ${userId}:`, error);
        throw error;
    }
};

const deleteFile = async (userId, fileName, folderName='trips', bucketName = process.env.AWS_BUCKET_NAME) => {
    try {
        const folderKey = `${userId}-${folderName}/`;
        const response = await s3.deleteObject({
            Bucket: bucketName,
            Key: `${folderKey}${fileName}`
        });
        return response;
    } catch (error) {
        console.error(`Error deleting file ${fileName} for user ${userId}:`, error);
        throw error;
    }
};

const checkFileExists = async (userId, fileName, folderName='trips', bucketName = process.env.AWS_BUCKET_NAME) => {
    try {
        const folderKey = `${userId}-${folderName}/`;
        await s3.headObject({
            Bucket: bucketName,
            Key: `${folderKey}${fileName}`
        });
        return true;
    } catch (error) {
        if (error.code === 'NotFound') {
            return false;
        }
        console.error(`Error checking file ${fileName} for user ${userId}:`, error);
        throw error;
    }
};

export {
    createFolder,
    listFiles,
    uploadFile,
    downloadFile,
    deleteFile,
    checkFileExists
};