import Spinner from '../../../public/Spinner/Spinner.svg';
export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={Spinner} alt="로딩중" width="50%" />
      <h3 className="text-l-lg text-content">로딩중</h3>
    </div>
  );
}
