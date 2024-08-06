import express from "express";
import { launch } from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/generate-image", async (req, res) => {
  const { title, description, imageUrl } = req.query;

  if (!title || !description) {
    return res.status(400).send("Title and description are required");
  }

  const htmlContent = `
    <html>
    <body style="width: 1200px; height: 630px; background: white; padding: 20px; box-sizing: border-box; font-family: Arial, sans-serif; overflow: hidden;">
      <div style="position: relative; width: 100%; height: 100%;">
        <h1 style="font-size: 48px; color: black; margin: 0; overflow-wrap: break-word; white-space: normal; word-break: break-word;">
          ${title}
        </h1>
        <p style="font-size: 36px; color: black; margin: 0; margin-top: 20px; overflow-wrap: break-word; white-space: normal; word-break: break-word;">
          ${description}
        </p>
        ${
          imageUrl
            ? `<img src="${imageUrl}" style="width: 150px; height: 150px; position: absolute; bottom: 20px; right: 20px;" />`
            : ""
        }
      </div>
    </body>
    </html>
  `;

  const browser = await launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  const buffer = await page.screenshot({ type: "png" });
  await browser.close();

  res.set("Content-Type", "image/png");
  res.send(buffer);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
