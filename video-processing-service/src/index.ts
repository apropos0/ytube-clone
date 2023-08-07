import express from 'express';

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.listen(port, () => {
    console.log(`Initial video processing setup, listening at http://localhost:${port}`)
})