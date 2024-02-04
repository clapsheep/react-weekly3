import A11yHidden from '../A11yHidden/A11yHidden';

const cartIcon = (
  <svg aria-hidden="true" width={45} height={45} viewBox="0 0 45 45" role="img">
    <use href="/icons/_sprite.svg#cart" />
  </svg>
);

export function CartButton({ className }) {
  return (
    <button className={className} type="button">
      {cartIcon}
      <A11yHidden>장바구니 담기</A11yHidden>
    </button>
  );
}
