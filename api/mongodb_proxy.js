const axios = require('axios');

module.exports = async (req, res) => {
  const url = `https://us-west-2.aws.data.mongodb-api.com/app/data-mdead/endpoint/data/v1/action/${req.body.action}`;

  try {
    const mongodbResponse = await axios({
      method: 'post',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.MONGODB_API_KEY, // Make sure to set this in your Vercel environment variables
        ...req.headers, // Forward any additional headers
      },
      data: req.body.data,
    });

    return res.status(200).json(mongodbResponse.data);
    } catch (error) {
    console.error('MongoDB proxy error:', error);
    // Send back a response even when the axios request fails
    return res.status(error.response?.status || 500).json({
      message: error.message
    });
  }
};
