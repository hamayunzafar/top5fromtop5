const axios = require('axios');

module.exports = async (req, res) => {
  const clientId = process.env.CLIENT_ID;      // Ensure these are correctly named as per your Vercel environment variables
  const clientSecret = process.env.CLIENT_SECRET;

  try {
    const authResponse = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: 'grant_type=client_credentials',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
      },
    });

    const accessToken = authResponse.data.access_token;
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Error making the request:', error);
    res.status(500).json({ error: error.message });
  }
};
