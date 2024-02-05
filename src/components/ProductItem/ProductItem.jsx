import { KarlyOnlyBadge, LimitedBadge } from '@/components';

function Discount({ children }) {
  return <span className=" text-accent-yellow text-l-lg">{children}</span>;
}

export default function ProductItem({
  title,
  discount,
  price,
  content,
  isLimited,
  isKarlyOnly,
  imageURL,
}) {
  const toWon = (price) => {
    return price.toLocaleString('ko-KR');
  };
  const discountPrice = (price, discount) => {
    return price - price * discount * 0.01;
  };

  return (
    <div className="flex flex-col gap-4 w-[249px]" role="group">
      <img className="w-[249px] h-[320px]" src={imageURL} alt="" />
      <div className='flex flex-col gap-2"'>
        <span className="text-l-sm text-gray-400">샛별배송</span>
        <span className="text-content text-p-base">{title}</span>
        <div className="flex gap-2">
          {discount ? <Discount>{discount}%</Discount> : ''}
          <span className="text-content text-l-lg">
            {discount
              ? toWon(Math.round(discountPrice(price, discount) / 10) * 10)
              : toWon(price)}
            원
          </span>
        </div>
        {discount ? (
          <span className="text-gray-400 text-p-sm line-through">
            {toWon(price)}원
          </span>
        ) : (
          ''
        )}
        <span className="text-gray-400 text-p-sm">{content}</span>
      </div>

      <div className="flex gap-4">
        {isKarlyOnly ? <KarlyOnlyBadge /> : ''}
        {isLimited ? <LimitedBadge /> : ''}
      </div>
    </div>
  );
}
