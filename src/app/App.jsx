import './App.css';
import PocketBase from 'pocketbase';
import ProductItem from '@/components/ProductItem/ProductItem';
import { getPbImageURL } from '@/utils';
import { CartButton } from '@/components';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from '@/components/Loading/Loading';
const API = import.meta.env.VITE_PB_URL;
const pb = new PocketBase(import.meta.env.VITE_PB_URL);

// pb SDK 사용하기
const productRecord = await pb.collection('products').getFullList();

// fetch로 데이터 통신 해보기
async function fetchProducts(options) {
  try {
    const response = await fetch(
      `${API}/api/collections/products/records`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    if (!(error instanceof DOMException)) {
      throw new Error(error);
    }
  }
}

function App() {
  const [cartState, setCartState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (name) => {
    if (!cartState.includes(name)) {
      const nextCart = [...cartState, name];
      setCartState(nextCart);
    } else {
      const nextCart = cartState.filter((item) => {
        return item !== name;
      });
      setCartState(nextCart);
    }
  };
  // 선생님 이 부분에 cartState 상태가 업데이트 될때마다, 로컬스토리지에 추가해주는 로직을 아래와 같이 무조건 remove를 하고, 업데이트 된 상태를 다시 셋하는 방식으로 했는데
  // 데이터 통신에 있어서 괜찮은 코드일까요? 아니면 더 효율적인 방법이 있을까요?
  useEffect(() => {
    localStorage.removeItem('cart');
    localStorage.setItem('cart', cartState);
  }, [cartState]);

  // 로딩 상태 표시 (스피너 사용하면 좋을 듯)
  useEffect(() => {
    const controller = new AbortController();
    fetchProducts({ signal: controller.signal }).then(() => {
      setIsLoading(false);
    });
    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="w-[783px] mx-auto my-4 border-4 border-primary rounded bg-purple-200">
        <h2 className=" text-l-base text-primary">현재 장바구니 상태 현황</h2>
        <span className=" text-p-sm h-15 border text-content">{cartState}</span>
      </div>
      <div className="flex flex-wrap mx-auto my-4 justify-between w-[783px] gap-y-6">
        {productRecord.map((item) => {
          return (
            <div key={item.id} className="relative">
              <ProductItem
                imageURL={getPbImageURL(item, 'thumbImg')}
                price={item.price}
                discount={item.discount}
                title={item.name}
                content={item.detail}
                isLimited={item.isLimited}
                isKarlyOnly={item.isKarlyOnly}
              />
              <CartButton
                onClick={() => {
                  handleClick(item.name);
                }}
                className="absolute top-[258px] right-[15px]"
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
