'use client';
import React, { useCallback } from 'react';
import { useParams } from 'next/navigation';
import { NFTData } from '@/utils/constant';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import useTokenProgram from '@/hook/useTokenProgram';
import { getIpfsToUrl } from '@/utils/helper';

function NFTInstance() {
  const params = useParams();
  const { connected } = useWallet();
  const { createSingleNft } = useTokenProgram();
  const id = params?.id || 1;
  const Nft = NFTData[id];

  const middleware = useCallback(async () => {
    if (connected) {
      try {
        const signature = await createSingleNft({
          name: Nft.name,
          uri: getIpfsToUrl(Nft?.ipfs),
        });
        console.log({ signature });
      } catch (error) {
        console.error(error);
      }
    }
  }, [connected, createSingleNft, Nft]);

  if (!params.id) return <></>;

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
