// api/dynamic-frame.js
export default function handler(req, res) {
    const { tokenId } = req.query;

    const targetUrl = `https://swatchesbotframe.vercel.app/api/frame2?tokenId=${tokenId}`
  
    // Generate the HTML content with the dynamic target URL
    const htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
              <title>Dynamic Frame</title>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="https://i.imgur.com/h6w3JQU.png" />
              <meta name="fc:frame:post_url" content="${targetUrl}" />
              <meta name="fc:frame:button:1" content="See More" />
          </head>
          <body>
              <!-- No content needed in the body -->
          </body>
          </html>
        `;
  
    // Send the HTML content as the response
    res.status(200).send(htmlContent);
  }
  