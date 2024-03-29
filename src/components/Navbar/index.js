'use client';
import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';

function NavBar() {
  return (
    <div className="navbar flex justify-between p-8 px-14">
      <div className="home_navigator flex gap-4 items-center">
        <div className="app_logo">
          <Link href={'/'}>
            <Image
              src="/LOGO3.png"
              alt="AL"
              className="w-10 h-10 rounded"
              width={40}
              height={40}
            />
          </Link>
        </div>
        <div className="app_name text-4xl text-center font-extrabold">
          NFT Minter
        </div>
      </div>
      <div className="wallet_connector">
        <button className="ConnectWallet_btn h-12 ">
          <WalletMultiButton className="w-full" />
          {/* {currentConfiguration &&
            (function () {
              if (currentConfiguration.address !== '') {
                try {
                  let address = currentConfiguration.address;
                  address = `${address.substring(0, 4)}...${address.substring(
                    address.length - 4,
                  )}`;
                  return address;
                } catch (error) {
                  console.log(true);
                  localStorage.setItem('metamaskConnection', 'false');
                  setWalletConnection(false);
                  console.log(error);
                }
              }
              return 'Connect Wallet';
            })()} */}
        </button>
      </div>
    </div>
  );
}

export default NavBar;
