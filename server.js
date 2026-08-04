const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const root = __dirname;
const productsDirectory = path.join(root, "images", "products");
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

const mimeTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml"
};

function sendJson(response, statusCode, body) {
    response.writeHead(statusCode, {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json; charset=utf-8"
    });
    response.end(JSON.stringify(body));
}

function readRequestBody(request) {
    return new Promise((resolve, reject) => {
        let body = "";

        request.setEncoding("utf8");
        request.on("data", chunk => {
            body += chunk;
            if (body.length > 15 * 1024 * 1024) {
                request.destroy();
                reject(new Error("Upload is too large."));
            }
        });
        request.on("end", () => resolve(body));
        request.on("error", reject);
    });
}

function getImageExtension(dataUrl) {
    const match = /^data:image\/(png|jpeg|jpg|webp|gif);base64,/.exec(dataUrl);
    if (!match) return null;
    return match[1] === "jpeg" ? "jpg" : match[1];
}

const server = http.createServer(async (request, response) => {
    const requestUrl = new URL(request.url, `http://${request.headers.host || "localhost"}`);

    if (request.method === "OPTIONS" && requestUrl.pathname === "/api/upload-product") {
        response.writeHead(204, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "POST, OPTIONS"
        });
        return response.end();
    }

    if (request.method === "POST" && requestUrl.pathname === "/api/upload-product") {
        try {
            const payload = JSON.parse(await readRequestBody(request));
            const extension = getImageExtension(payload.imageData);

            if (!extension) {
                return sendJson(response, 400, { error: "A valid product image is required." });
            }

            fs.mkdirSync(productsDirectory, { recursive: true });
            const fileName = `product-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;
            const filePath = path.join(productsDirectory, fileName);
            const base64Data = payload.imageData.replace(/^data:image\/[^;]+;base64,/, "");

            fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));
            return sendJson(response, 201, { image: `images/products/${fileName}` });
        } catch (error) {
            return sendJson(response, 400, { error: error.message });
        }
    }

    let pathname;
    try {
        pathname = decodeURIComponent(requestUrl.pathname);
    } catch {
        response.writeHead(400);
        return response.end("Bad request");
    }

    if (pathname === "/") pathname = "/index.html";
    const filePath = path.resolve(root, `.${pathname}`);

    if (!filePath.startsWith(root + path.sep)) {
        response.writeHead(403);
        return response.end("Forbidden");
    }

    fs.stat(filePath, (statError, stats) => {
        const target = !statError && stats.isDirectory() ? path.join(filePath, "index.html") : filePath;
        fs.readFile(target, (readError, data) => {
            if (readError) {
                response.writeHead(readError.code === "ENOENT" ? 404 : 500);
                return response.end(readError.code === "ENOENT" ? "Not found" : "Server error");
            }

            response.writeHead(200, {
                "Content-Type": mimeTypes[path.extname(target).toLowerCase()] || "application/octet-stream"
            });
            response.end(data);
        });
    });
});

server.listen(port, host, () => {
    console.log(`FlexStore served at http://${host}:${port}`);
});
