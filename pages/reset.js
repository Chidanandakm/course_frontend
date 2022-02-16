import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

 const  reset = ({ query }) => {
  if (!query?.token) {
    return (
      <div>
        <p>Sorry you must supply a token</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>RESET YOUR PASSWORD</p>
      <Reset token={query.token} />
    </div>
  );
}

export default reset;