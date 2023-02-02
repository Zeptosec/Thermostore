import express from 'express';
import cors from 'cors';
import { saveFile } from './bot.js';
import fileUpload from "express-fileupload";
import os from 'os';

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", function (req, res) {
    res.status(200).send("Back is alive");
});

app.post("/api/upload",
    fileUpload({
        limits: {
            fileSize: 8 * 1024 ** 2 + 1
        },
        abortOnLimit: true
    }), async (req, res) => {
        if (!req.files) {
            return res.status(400).json({ msg: 'No files were uploaded.' });
        }
        const file = req.files.file;
        if (file.size*2 > os.freemem()) {
            return res.status(406).send({ msg: 'There is not enough memory available to upload this file' });
        }
        const rs = await saveFile(req.files.file)
        if (rs) {
            const parts = rs.split('/');
            return res.status(200).json({ msg: "success", fileid: parts[parts.length - 2] });
        }
        res.status(500).json({ msg: "failed" });
    })

let port = process.env.PORT || 4000;
app.listen(port, () => console.log("running on port: " + port));