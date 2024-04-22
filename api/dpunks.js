import axios from "axios";

// Function to fetch data from the API endpoint
async function fetchData(addr, cursor = null) {
    const url = cursor
    ? `https://api.simplehash.com/api/v0/nfts/owners?chains=degen&wallet_addresses=${addr}&contract_addresses=0x8A53ED5189ca8D5cAc4149d75408cec047CD5b2e&limit=50&cursor=${cursor}`
    : `https://api.simplehash.com/api/v0/nfts/owners?chains=degen&wallet_addresses=${addr}&contract_addresses=0x8A53ED5189ca8D5cAc4149d75408cec047CD5b2e&limit=50`;

  const headers = {
    "X-API-KEY": "segwitnitwit_sk_e69e7ccf-d59c-4567-a021-37aac3321da8_8b387gtgmfprwxnm",
    accept: "application/json",
  };
  try {
    const response = await axios.get(url, {headers});
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Function to generate HTML content with image grid
function generateHTML(images) {
    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Image Grid</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .image-container {
          max-width: 50%;
          width: auto;
          height: auto;
          margin: 10px;
          text-align: center;
        }
        .image {
          width: 100%;
          height: auto;
        }
        .token-id {
          font-size: 1rem;
        }
      </style>
    </head>
    <body>
    `;
  
    // Generate image elements
    images.forEach(image => {
      html += `
      <div class="image-container">
        <img class="image" src="${image.previews.image_small_url}" alt="${image.name}">
        <div class="token-id">${image.token_id}</div>
      </div>
      `;
    });
  
    html += `
    </body>
    </html>
    `;
  
    return html;
}

// Vercel function handler
export default async function handler(req, res) {
    const { addr } = req.query; // Extract wallet address from request query params

    // Fetch data from the API
    const data = await fetchData(addr);

    if (!data) {
        console.log("Failed to fetch data. Exiting...");
        res.status(500).send("Failed to fetch data");
        return;
    }

    // Extract images from the response
    const images = data.nfts;

    // Generate HTML content
    const htmlContent = generateHTML(images);

    // Send HTML content as response
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(htmlContent);
}
