import express from 'express';
import ffmpeg from 'fluent-ffmpeg';

const app = express();
app.use(express.json())

app.post("/process-video", (req, res) => {
    //request body will have path of request
    const videoFilePath = req.body.videoFilePath
    const outputFilePath = req.body.outputFilePath
    
    if (!videoFilePath || !outputFilePath){
        res.status(400).send("Bad request: Missing video file path")
    }

    ffmpeg(videoFilePath).outputOptions("-vf", "scale=-1:360")
    .on("end", () => {
        res.status(200).send("Video processed successfully");
    }).on("error", (err) => {
        return res.status(500).send(`Internal server error: ${err.message}`);
    })
    .save(outputFilePath);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Initial video processing setup, listening at http://localhost:${port}`)
})