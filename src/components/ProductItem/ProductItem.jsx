import { CartButton } from '@/components/Button/Button';
import { KarlyOnlyBadge, LimitedBadge } from '../Badge/Badge';

function Discount({ children }) {
  return <span className=" text-accent-yellow text-l-lg">{children}</span>;
}

export default function ProductItem({
  title,
  discount,
  price,
  realPrice,
  content,
  limit,
}) {
  const toWon = (price) => {
    return price.toLocaleString('ko-KR');
  };
  return (
    <div className="flex flex-col gap-4" role="group">
      <div className="relative w-[249px] h-[320px] bg-red-300">
        <img className=" " src="" alt="" />
        <CartButton className="absolute bottom-[17px] right-[15px]" />
      </div>
      <div className='flex flex-col gap-2"'>
        <span className="text-l-sm text-gray-400">샛별배송</span>
        <span className="text-content text-p-base">{title}</span>
        <div className="flex gap-2">
          {discount ? <Discount>{discount}%</Discount> : ''}
          <span className="text-content text-l-lg">{toWon(realPrice)}원</span>
        </div>
        <span className="text-gray-400 text-p-sm line-through">
          {toWon(price)}원
        </span>
        <span>{content}</span>
      </div>

      <div className="flex gap-4">
        <KarlyOnlyBadge />
        {limit ? <LimitedBadge /> : ''}
      </div>
    </div>
  );
}
