import Link from 'next/link';

function NFTCard({ id, name, image, description, type }) {
  return (
    <Link href={`/nft-instance/${id}`}>
      <div className="nft_box w-80 h-fit relative rounded-lg shadow-lg text-black text-xs flex flex-col gap-3 pb-4">
        <div className="nft_img rounded-lg">
          <img
            src={image}
            alt="nftImage"
            className="rounded-lg w-80 h-80 border-blue-600"
            width={360}
            height={360}
          />
        </div>
        <div className="nft_metadata px-3">
          <p className="nft_name text-base font-bold">{name}</p>
          <p className="h-9 overflow-hidden">{description}</p>
        </div>
        <div className="nftType absolute top-2 left-2 p-2 px-8 rounded-2xl text-base ">
          <p className="text-blue-900">{type}</p>
        </div>
      </div>
    </Link>
  );
}

export default NFTCard;
