import axios from 'axios';

export const getIpfsOfMetadata = async (metadata) => {
  const imageHash = await pinFileToIPFS(metadata);
  console.log({ imageHash });

  const { name, description } = metadata;
  const data = JSON.stringify({
    pinataContent: {
      name: name,
      description: description,
      external_url: `https://ipfs.io/ipfs/${imageHash}`,
      image: `https://ipfs.io/ipfs/${imageHash}`,
    },
    pinataMetadata: {
      name: 'metadata.json',
    },
  });

  try {
    const res = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
        },
      },
    );
    return res.data.IpfsHash;
  } catch (error) {
    throw new Error(error);
  }
};

export const pinFileToIPFS = async (metadata) => {
  const fileData = new FormData();
  fileData.append('file', metadata.imageFile);

  const pinataMetadata = JSON.stringify({
    name: metadata.name,
  });
  fileData.append('pinataMetadata', pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  fileData.append('pinataOptions', pinataOptions);

  console.log(process.env.NEXT_PUBLIC_PINATA_JWT);

  try {
    const res = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      fileData,
      {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${fileData._boundary}`,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
        },
      },
    );

    return res.data.IpfsHash;
  } catch (error) {
    console.log(error);
  }
};
