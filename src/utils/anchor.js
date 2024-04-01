import { getAssociatedTokenAddress } from '@solana/spl-token';
import { BN, utils, web3 } from '@coral-xyz/anchor';

export const getATA = ({ mint, owner }) =>
  getAssociatedTokenAddress(mint, owner);

export const getPDA = (seeds, programId) => {
  const bufferSeeds = [];
  for (let seed of seeds) {
    if (typeof seed === 'string') {
      bufferSeeds.push(Buffer.from(utils.bytes.utf8.encode(seed)));
    } else if (Array.isArray(seed)) {
      bufferSeeds.push(Buffer.from(seed));
    } else if (typeof seed == 'bigint' || typeof seed == 'number') {
      bufferSeeds.push(Buffer.from(new BN(seed).toArray('le', 8)));
    } else {
      bufferSeeds.push(seed.toBuffer());
    }
  }

  let res = web3.PublicKey.findProgramAddressSync(
    bufferSeeds,
    typeof programId === 'string' ? new web3.PublicKey(programId) : programId,
  );
  return { publicKey: res[0], bump: res[1] };
};
