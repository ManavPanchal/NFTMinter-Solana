export const getRandomNumberU64 = () => {
  const min = BigInt(1);
  const max = BigInt('18446744073709551615'); // 2^64 - 1
  const randomNumber =
    BigInt(Math.floor(Math.random() * (Number(max - min) + 1))) + min;
  return randomNumber;
};

export const getIpfsToUrl = (ipfs) => {
  const ipfs_hash = ipfs.replace('ipfs://', '');
  return 'https://ipfs.io/ipfs/' + ipfs_hash;
};
