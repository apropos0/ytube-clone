import {Storage} from '@google-cloud/storage';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';


const storage = new Storage();
const rawVideoBucketName = "ytube-clone-raw-videos"
const processedVideoBucketName = "ytube-clone-processed-videos";

const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";

export function setupVideoDirectories() {
    verifyDirectoryPath(localProcessedVideoPath)
    verifyDirectoryPath(localRawVideoPath)
}

export function convertVideo(rawVideoName: string, processedVideoName: string) {
    return new Promise<void>((resolve, reject) => {
        ffmpeg(`${localRawVideoPath}/${rawVideoName}`)
        .outputOptions("-vf", "scale=-1:360")
        .on("end", () => {
            console.log("Video processed successfully");
            resolve();
        }).on("error", (err) => {
            console.log(`Internal server error: ${err.message}`);
            reject(err);
        })
        .save(`${localProcessedVideoPath}/${processedVideoName}`);
})
}

export async function downloadRawVideo(fileName: string){
    await storage.bucket(rawVideoBucketName)
    .file(fileName)
    .download({destination: `${localRawVideoPath}/${fileName}`})

    console.log(`gs://${rawVideoBucketName}/${fileName} downloaded to ${localRawVideoPath}/${fileName}`)
}

export async function uploadProcessedVideo(fileName: string) {
    const bucket = storage.bucket(processedVideoBucketName);

    await bucket.upload(`${localProcessedVideoPath}/${fileName}`, {
        destination: fileName
    })

    console.log(`${localProcessedVideoPath}/${fileName} has been uploaded to gs://${processedVideoBucketName}/${fileName}`)
    await bucket.file(fileName).makePublic();
}

export function deleteRawVideo(fileName: string){
    return deleteVideoFromFileSystem(`${localRawVideoPath}/${fileName}`)
}

export function deleteProcessedVideo(fileName: string) {
    return deleteVideoFromFileSystem(`${localProcessedVideoPath}/${fileName}`)
}

function deleteVideoFromFileSystem(filePath: string){
    return new Promise<void>((resolve, reject) => {
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(`Failed to deleted file at path: ${filePath}`, err)
                    reject(err)
                } else {
                    console.log(`Successfully deleted file at path: ${filePath}`)
                    resolve();
                }
            })
        } else {
            console.log(`File ${filePath} does not exist`)
            resolve();
        }
    })
}

function verifyDirectoryPath(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, {recursive: true});
        console.log(`Direcotry created at ${dirPath}`)
    } else {
        console.log(`Directory at ${dirPath} exists`)
    }
}