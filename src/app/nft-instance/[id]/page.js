'use client';
import React, { useCallback } from 'react';
import { useParams } from 'next/navigation';
import { NFTData, programId } from '@/utils/constant';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider, BN, Program, web3 } from '@coral-xyz/anchor';
import idl from '@/utils/IDL/single-nft.json';
import { getIpfsToUrl, getRandomNumberU64 } from '@/utils/helper';
import { getMethodBuilder } from '@/utils/anchor-method-builder';
import { getATA, getPDA } from '@/utils/anchor';
import { MPL_TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { PublicKey } from '@solana/web3.js';

function NFTInstance() {
  console.log({ idl });
  const params = useParams();

  if (!params) return;
  const id = params?.id;
  const Nft = NFTData[id];

  const { connection } = useConnection();
  const { publicKey, signAllTransactions, signTransaction, connected } =
    useWallet();

  const middleware = useCallback(async () => {
    if (connected) {
      const anchorWallet = { publicKey, signAllTransactions, signTransaction };
      const anchorProvider = new AnchorProvider(connection, anchorWallet, {
        skipPreflight: true,
        commitment: 'finalized',
      });

      const randomNumber = getRandomNumberU64();
      const program = new Program(
        idl,
        new web3.PublicKey(programId),
        anchorProvider,
      );
      const uri = getIpfsToUrl(Nft?.ipfs);

      const mint = getPDA(['mint', randomNumber], programId).publicKey;
      console.log(mint.toString());

      const methodBuilder = getMethodBuilder(
        program,
        'createSingleNft',
        [
          new BN(randomNumber),
          Nft?.name,
          Nft?.name,
          uri,
          0.48830169250503963,
          new BN(randomNumber),
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
      try {
        const signature = await methodBuilder.rpc();
        console.log({ signature });
      } catch (error) {
        console.error(error);
      }
    }
  }, [connected, publicKey, connection]);

  return (
    <div className="nftInstance my-12 flex m-4 justify-center gap-14 items-center p-4">
      <div className="NFTImage">
        <img src={Nft?.image || ''} alt="NFT" className="h-128 rounded-lg" />
      </div>
      <div className="nft_instance_info h-full flex flex-col justify-evenly gap-6">
        <div className="instance_metadata rounded-lg flex flex-col gap-3">
          <h3 className="text-4xl font-bold relative">{Nft.name}</h3>
          <h5 className="text-2xl">{Nft.description}</h5>
        </div>
        <div className="minting_proccess rounded-lg w-full flex flex-col">
          <div className="nft_receiver_address w-full">
            <p> -- Minting Address --</p>
            <input
              type="text"
              placeholder="address"
              className="address_input px-3 w-full rounded-lg focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="text-xl hover:text-blue-600 w-full border border-blue-600 rounded-lg py-2 mt-2"
            onClick={middleware}
          >
            Mint
          </button>
        </div>
      </div>
    </div>
  );
}

export default NFTInstance;
