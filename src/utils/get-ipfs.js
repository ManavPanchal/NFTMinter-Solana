const getIpfsOfMetadata = async () => {
  const data = JSON.stringify({
    pinataContent: {
      name: name,
      description: description,
      external_url: `https://ipfs.io/ipfs/${imageHash}`,
      image: `ipfs://${imageHash}`,
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
