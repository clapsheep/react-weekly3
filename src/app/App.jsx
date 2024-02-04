import './App.css';
import ProductItem from '@/components/ProductItem/ProductItem';

function App() {
  return (
    <>
      <ProductItem
        realPrice={10000}
        price={7800}
        discount={24}
        title={'[풀무원] 탱탱쫄면 (4개입)'}
        content={'튀기지 않아 부담없는 매콤함'}
        limit
      />
    </>
  );
}

export default App;
