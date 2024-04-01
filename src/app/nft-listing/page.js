import { categories, NFTData } from '@/utils/constant';
import './Listing.css';
import NFTCard from '@/components/NFTCard';
import Image from 'next/image';
import Link from 'next/link';

function NFTListing() {
  return (
    <div className="listing_box m-9 flex flex-col gap-16">
      <div className="category_box flex justify-around mb-9">
        {categories.map((ele, index) => {
          return (
            <a href={`#${ele.name.toLowerCase()}nft_box`} key={index}>
              <div className="categories flex p-3 w-56 gap-5 items-center rounded-xl border hover:border-blue-600 border-transparent">
                <Image
                  src={ele.image}
                  alt=""
                  className="w-10"
                  width={40}
                  height={20}
                />
                <h3 className="category_name text-xl font-medium">
                  {ele.name}
                </h3>
              </div>
            </a>
          );
        })}
      </div>
      <div id="trending_nft_box" className="px-7 w-full">
        <div className="flex justify-between w-full items-center">
          <h2 className="category_name gradient-text text-4xl font-bold my-6 w-[80%]">
            Trending NFTs
          </h2>
          <div className="flex justify-center ">
            <Link href="/nft-instance/new">
              <div className="new-instance-button bg-color flex items-center p-2 pl-4 pr-5 text-black gap-2 rounded-xl bg-[#c9c3f3]">
                <span className="text-2xl">+</span> Create your own
              </div>
            </Link>
          </div>
        </div>
        <div className="nft_listing gap-7  overflow-x-scroll scrollbar-hide">
          {NFTData &&
            NFTData.filter((ele) => ele.isTrending).map((ele, index) => {
              return (
                <NFTCard
                  key={index}
                  id={ele.id}
                  name={ele.name}
                  image={ele.image}
                  description={ele.description}
                  type={ele.type}
                />
              );
            })}
        </div>
      </div>
      <div id="artsnft_box" className="px-7">
        <div className="category_name gradient-text text-4xl font-bold my-6">
          Arts
        </div>
        <div className="nft_listing gap-7 overflow-x-scroll scrollbar-hide">
          {NFTData &&
            NFTData.filter((ele) => ele.type === 'Art').map((ele, index) => {
              return (
                <NFTCard
                  key={index}
                  id={ele.id}
                  name={ele.name}
                  image={ele.image}
                  description={ele.description}
                  type={ele.type}
                />
              );
            })}
        </div>
      </div>
      <div id="musicnft_box" className="px-7">
        <div className="category_name gradient-text text-4xl font-bold my-6">
          Music
        </div>
        <div className="nft_listing gap-7  overflow-x-scroll scrollbar-hide">
          {NFTData &&
            NFTData.filter((ele) => ele.type === 'Music').map((ele, index) => {
              return (
                <NFTCard
                  key={index}
                  id={ele.id}
                  name={ele.name}
                  image={ele.image}
                  description={ele.description}
                  type={ele.type}
                />
              );
            })}
        </div>
      </div>
      <div id="collectiblesnft_box" className=" px-7">
        <div className="category_name gradient-text text-4xl font-bold my-6">
          Collectible
        </div>
        <div className="nft_listing gap-7  overflow-x-scroll scrollbar-hide">
          {NFTData &&
            NFTData.filter((ele) => ele.type === 'Collectible').map(
              (ele, index) => {
                return (
                  <NFTCard
                    key={index}
                    id={ele.id}
                    name={ele.name}
                    image={ele.image}
                    description={ele.description}
                    type={ele.type}
                  />
                );
              },
            )}
        </div>
      </div>
      <div id="sportnft_box" className="px-7">
        <div className="category_name gradient-text text-4xl font-bold my-6">
          Sports
        </div>
        <div className="nft_listing gap-7  overflow-x-scroll scrollbar-hide">
          {NFTData &&
            NFTData.filter((ele) => ele.type === 'Sports').map((ele, index) => {
              return (
                <NFTCard
                  key={index}
                  id={ele.id}
                  name={ele.name}
                  image={ele.image}
                  description={ele.description}
                  type={ele.type}
                />
              );
            })}
        </div>
      </div>
      <div id="animenft_box" className="px-7">
        <div className="category_name gradient-text text-4xl font-bold my-6">
          Anime
        </div>
        <div className="nft_listing gap-7  overflow-x-scroll scrollbar-hide">
          {NFTData &&
            NFTData.filter((ele) => ele.type === 'Anime').map((ele, index) => {
              return (
                <NFTCard
                  key={index}
                  id={ele.id}
                  name={ele.name}
                  image={ele.image}
                  description={ele.description}
                  type={ele.type}
                />
              );
            })}
        </div>
      </div>
      <div id="carsnft_box" className="px-7">
        <div className="category_name gradient-text text-4xl font-bold my-6">
          Cars
        </div>
        <div className="nft_listing gap-7  overflow-x-scroll scrollbar-hide">
          {NFTData &&
            NFTData.filter((ele) => ele.type === 'Cars').map((ele, index) => {
              return (
                <NFTCard
                  key={index}
                  id={ele.id}
                  name={ele.name}
                  image={ele.image}
                  description={ele.description}
                  type={ele.type}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default NFTListing;
