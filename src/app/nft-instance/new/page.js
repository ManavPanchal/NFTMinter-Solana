'use client';
import React, { useState } from 'react';
import CreateNFTInstanceForm from '@/components/CreateNFTInstanceForm';
import NFTCard from '@/components/NFTCard';
import { getIpfsOfMetadata } from '@/utils/get-ipfs';
import useTokenProgram from '@/hook/useTokenProgram';

const New = () => {
  const [tokenMetadata, setTokenMetadata] = useState();
  const [isMinting, setIsMinting] = useState(false);
  const [isCreatingIPFS, setIsCreatingIPFS] = useState(false);
  const { createSingleNft } = useTokenProgram();

  const onMintNFT = async (metadata) => {
    setIsMinting(true);
    setTokenMetadata({
      ...metadata,
      image: URL.createObjectURL(metadata.imageFile),
    });

    setIsCreatingIPFS(true);
    const ipfsHash = await getIpfsOfMetadata(metadata);
    if (!ipfsHash) return;
    const metadataURL = `https://ipfs.io/ipfs/${ipfsHash}`;
    setIsCreatingIPFS(false);

    try {
      const signature = await createSingleNft({
        name: metadata.name,
        uri: metadataURL,
      });
      console.log({ signature });
    } catch (error) {
      console.log(error);
    }

    setIsMinting(false);
  };

  return (
    <div className="main flex justify-center items-center h-full">
      <div className="flex flex-col gap-2 w-[50%] justify-center items-center">
        {tokenMetadata && (
          <div className="mt-10">
            <NFTCard
              description={tokenMetadata.description}
              image={tokenMetadata.image}
              name={tokenMetadata.name}
            />
          </div>
        )}
        <div className="header w-full text-7xl max-w-md font-bold text-center py-8 mx-20 ">
          Create Your Own NFT
        </div>
      </div>
      <CreateNFTInstanceForm onMintNFT={onMintNFT} isMinting={isMinting} />
    </div>
  );
};

export default New;
