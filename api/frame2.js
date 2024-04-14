// api/dynamic-frame-2.js
export default function handler(req, res) {
    // Extract the dynamic token ID from query parameters
    const { tokenId } = req.query;
  
    // Construct the dynamic target URL based on the token ID
    const targetUrl = `https://opensea.io/assets/base/0x13dc8261fce63499aa25deb512bb1827b411b83b/${tokenId}`;
  
    // Generate the HTML content with the dynamic target URL
    const htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
              <title>Dynamic Frame</title>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="https://ipfs.io/ipfs/Qmc3zYWXxeTSNwkcMPMVAu1WQemm3tu3fNkm7hfTKrLGh7/${tokenId}.png" />
              <meta property="fc:frame:image:aspect_ratio" content="1:1" />
              <meta property="fc:frame:button:1" content="View on OpenSea" />
              <meta property="fc:frame:button:1:action" content="link" />
              <meta property="fc:frame:button:1:target" content="${targetUrl}" />
          </head>
          <body>
              <!-- No content needed in the body -->
          </body>
          </html>
        `;
  
    // Send the HTML content as the response
    res.status(200).send(htmlContent);
}
