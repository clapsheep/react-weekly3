- 3주차 과제를 확인한 후, 과제를 제출하세요. (마크업 구현 ✅ / 기능 구현 ✅)
  - [x] 바닐라 프로젝트의 데이터베이스 연동 부분을 리액트로 구현합니다.
  - [x] 리액트 방식으로 앱의 상태 및 사이드 이펙트를 관리해봅니다.
  - [ ] 커스텀 훅 함수를 1개 이상 작성해 여러 곳에서 재사용 해봅니다.
  - [ ] 가능한 경우, DOM 객체에 접근/조작하는 부분도 구현합니다. (옵션)
  - [ ] 가능한 경우, Storybook을 활용해보세요. (옵션)

# 상품리스트 장바구니 localStorage 제어 및 화면 출력하기!!

</br>

## [1] 상품리스트를 PB에서 데이터를 받아와 렌더링하기
```jsx
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
```
### 바닐라 프로젝트 때 편하게 PB SDK만 사용했더니, fetch를 사용하는 법을 까먹었다. 그래서 두가지 방법을 동시에 사용해보기로 했다.
1. PB SDK를 활용한 데이터 통신 : 리스트 렌더링에 사용
2. fetch를 활용한 데이터 통신 : Loading Spinner에 사용


### 관련내용 질문사항
1. PB SDK를 활용한 `productRecord`는 data를 담은 배열을 반환</br>
  fetchProducts()를 실행한 값은 Promise를 반환합니다.</br>
  이 때, fetchProducts에서 `productRecord`처럼</br>
  data를 담은 새로운 배열을 반환하고 싶다면 어떻게 해야하나요?

2. 반대로 Promise를 반환하는 fetchProducts()의 경우에는</br>
  .then()을 사용하므로 useEffect를 사용해 스피너 처리나, 사이드 이펙트로 활용이 가능했는데.</br>
  PB SDK를 사용한 `productRecord`는 바로 배열이 떨어져서 useEffect에서 활용할 수 없는게 맞나요?
</br>
</br>
</br>

## [2] useState 및 useEffect
1. cartState - 장바구니에 담은 상품의 이름들의 상태를 가져와서 화면에 현재 장바구니에 담은 품목을 출력, 또한 해당 상태를 기준으로 localStorage에 cart값 제어
  ![cart](https://github.com/clapsheep/react-weekly3/assets/140643716/d6c95b8e-3905-430a-a2f4-ae8c189e8e58)
```jsx
  const [cartState, setCartState] = useState([]);

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
```

2. isLoading - 데이터 통신에 걸리는 로딩을 표시할 Spinner 구현
   ![spinner](https://github.com/clapsheep/react-weekly3/assets/140643716/5b7b1727-71ba-472b-81c0-85c66a4b303b)
```jsx
const [isLoading, setIsLoading] = useState(true);

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
```
### 관련내용 질문사항
1. cartState 상태가 업데이트 될 때마다, 로컬스토리지에 추가해주는 로직을 아래와 같이 무조건 remove를 하고,</br>
업데이트 된 상태를 다시 set하는 방식으로 했는데</br>
데이터 통신에 있어서 괜찮은 코드일까요? 아니면 더 효율적인 방법이 있을까요?
</br>
</br>

## 느낀점
useRef를 배워서 활용해보고 싶었는데, 나의 예제에는 어떻게 활용해야할지 모르겠다.
useEffect를 통해 DOM을 제어하는 미션이 있었는데, 나의 예제에서는 쓸만한 곳이 있는지, 언제 사이드이펙트로 DOM을 조작해야하는지 모르겠다.
   
