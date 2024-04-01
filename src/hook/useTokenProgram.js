'use client';

import { useCallback, useMemo } from 'react';
import { getATA, getPDA } from '@/utils/anchor';
import { getMethodBuilder } from '@/utils/anchor-method-builder';
import { programId } from '@/utils/constant';
import { getRandomNumberU64 } from '@/utils/helper';
import { AnchorProvider, BN, Program } from '@coral-xyz/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { MPL_TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import * as idl from '@/utils/IDL/single-nft.json';

const useTokenProgram = () => {
  const { connection } = useConnection();
  const { publicKey, signAllTransactions, signTransaction } = useWallet();
  const anchorWallet = { publicKey, signAllTransactions, signTransaction };
  const anchorProvider = useMemo(
    () =>
      new AnchorProvider(connection, anchorWallet, {
        skipPreflight: true,
        commitment: 'finalized',
      }),
    [anchorWallet],
  );
  const program = useMemo(
    () => new Program(idl, new PublicKey(programId), anchorProvider),
    [anchorProvider],
  );

  const createSingleNft = useCallback(async ({ name, uri }) => {
    const randomNumber = getRandomNumberU64();
    const mint = getPDA(['mint', randomNumber], programId).publicKey;

    const methodBuilder = getMethodBuilder(
      program,
      'createSingleNft',
      [
        new BN(randomNumber),
        name,
        '', // we don't need symbol for NFT
        uri,
        0.48830169250503963, // as of now the price of the NFT is fix
        new BN(randomNumber), // we are setting up cant same to the ID
      ],
      {
        authority: publicKey,
        payer: publicKey,
        mint,
        tokenAccount: await getATA({ mint, owner: publicKey }),
        masterEditionAccount: getPDA(
          [
            'metadata',
            new PublicKey(MPL_TOKEN_METADATA_PROGRAM_ID),
            mint,
            'edition',
          ],
          MPL_TOKEN_METADATA_PROGRAM_ID,
        ).publicKey,
        nftMetadata: getPDA(
          ['metadata', new PublicKey(MPL_TOKEN_METADATA_PROGRAM_ID), mint],
          MPL_TOKEN_METADATA_PROGRAM_ID,
        ).publicKey,
      },
    );

    return methodBuilder.rpc();
  });

  return useMemo(
    () => ({ anchorProvider, program, createSingleNft }),
    [anchorProvider, program, createSingleNft],
  );
};

export default useTokenProgram;
