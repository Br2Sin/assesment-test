
const FormData = require('form-data');
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require('axios');


export const pinFileToIPFS = async (imgFile:any) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  let result = {}
  let data = new FormData();
  data.append('file', imgFile);
  await axios.post(url,
    data,
    {
      headers: {
        'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
        'pinata_api_key': key,
        'pinata_secret_api_key': secret
      }
    }
  ).then(function (response:any) {
     result = {
      success: true,
      imageUri: "https://ipfs.io/ipfs/" + response.data.IpfsHash,
      timestamp: response.data.Timestamp
    }
  }).catch(function (error:any) {
    console.log(error)
    result = {
      success: false,
      error: error
    }
  });

  return result
}