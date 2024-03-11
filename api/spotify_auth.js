const axios = require('axios');

module.exports = async (req, res) => {
  const { clientId, clientSecret } = process.env;

  try {
    const authResponse = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: 'grant_type=client_credentials',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
      },
    });

    const accessToken = authResponse.data.access_token;
    return res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
