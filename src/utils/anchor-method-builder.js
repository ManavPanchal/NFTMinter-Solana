import { MPL_TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { Program, Address } from '@coral-xyz/anchor';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { SYSVAR_RENT_PUBKEY } from '@solana/web3.js';

/**
 * Creates a method builder for a specific function of a program.
 * @param {Program} program - The program type of anchor.
 * @param {string} functionName - The name of the function to create a method builder for.
 * @param {Array<any> | undefined} args - An array of arguments to pass to the function.
 * @param {Object<string, Address>} accounts - An object containing accounts required for the function.
 * @returns {} - A method builder object.
 */
export const getMethodBuilder = (program, functionName, args, accounts) => {
  console.log('functionNAme', functionName);
  return program.methods[functionName](...args)
    .accounts({
      ...accounts,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      rent: SYSVAR_RENT_PUBKEY,
      systemProgram: '11111111111111111111111111111111',
      tokenProgram: TOKEN_PROGRAM_ID,
      metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
    })
    .signers([]);
};
