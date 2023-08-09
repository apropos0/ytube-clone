import express from 'express';
import ffmpeg from 'fluent-ffmpeg';
import { convertVideo, deleteProcessedVideo, deleteRawVideo, downloadRawVideo, setupVideoDirectories, uploadProcessedVideo } from './storage';

setupVideoDirectories()
const app = express()
app.use(express.json())

app.post("/process-video", async (req, res) => {

    let data;
    try {
        const message = Buffer.from(req.body.message.data, 'base64').toString('utf8')
        data = JSON.parse(message)
        if (!data.name) {
            throw new Error('Invalid message payload received.')
        }
    } catch (error) {
        console.error(error)
        return res.status(400).send('Bad request: missing fileName')
    }
    
    const inputFileName = data.name
    const outputFileName = `processed-${inputFileName}`

    await downloadRawVideo(inputFileName)

    try {
        await convertVideo(inputFileName, outputFileName)
    } catch (err) {
        await Promise.all([
            deleteRawVideo(inputFileName),
            deleteProcessedVideo(outputFileName)
        ])
        console.error(err)
        return res.status(500).send('Internal Server Error: video processing failed')
    }
    await uploadProcessedVideo(outputFileName)
    await Promise.all([
        deleteRawVideo(inputFileName),
        deleteProcessedVideo(outputFileName)
    ])

    return res.status(200).send("Processing completed successfully")
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Initial video processing setup, listening at http://localhost:${port}`)
})