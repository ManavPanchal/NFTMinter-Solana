'use client';
import React, { useRef, useState } from 'react';
import { Tooltip } from '@mui/material';
import { InfoIcon } from '@/utils/constant';

const CreatNftInstanceForm = ({ onMintNFT, isMinting = false }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [imageFile, setImageFile] = useState();
  const fileInputRef = useRef();

  const onMint = () => {
    onMintNFT({
      name,
      description,
      imageFile,
    });
  };

  return (
    <div className="mint_box mx-16 py-10 flex flex-col gap-9">
      <div className="minting_note">
        * Please fill the Input fields and choose image carefully as it is
        immutable after succesfully minted and the field with
        <span className=" text-red-500 text-lg"> * </span> is mendatory feilds
      </div>
      <div className="flex flex-col gap-3 token_name">
        <label htmlFor="name_input" className="flex gap-1 text-xl">
          Name
          <span>*</span>
          <sub>
            <Tooltip title="Add" placement="right-end">
              <InfoIcon />
            </Tooltip>
          </sub>
        </label>
        <input
          className="rounded px-3 w-full"
          type="text"
          name="name_input"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="flex flex-col gap-3 token_image">
        <label htmlFor="tokenImage_input" className="flex gap-1 text-xl">
          Token Image
          <span>*</span>
          <sub>
            <Tooltip title="Add" placement="right-end">
              <InfoIcon />
            </Tooltip>
          </sub>
        </label>
        <input
          ref={fileInputRef}
          className="rounded px-3"
          type="file"
          name="tokenImage_input"
          onChange={(event) => setImageFile(event.target.files[0])}
          hidden
        />
        {!imageFile && (
          <button
            className="file_input w-28 h-28 rounded-xl flex justify-center items-center text-3xl"
            onClick={() => {
              fileInputRef.current.click();
            }}
          >
            +
          </button>
        )}
        <div className="image_name">{imageFile && imageFile.name}</div>
      </div>
      <div className="flex flex-col gap-3 extra_metadata">
        <label htmlFor="description_input" className="flex gap-1 text-xl">
          Description
        </label>
        <textarea
          className="rounded px-3 w-full p-1"
          type="number"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <button
        className="mint_btn w-full h-14 text-x text-gray-700 font-bold rounded-xl text-center border border-blue-600"
        onClick={onMint}
        disabled={isMinting}
      >
        Mint NFT
      </button>
    </div>
  );
};

export default CreatNftInstanceForm;
