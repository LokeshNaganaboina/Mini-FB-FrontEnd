import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../configs/axiosConfig';
import envConfig from '../configs/envConfig';

const Navigation = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    axiosInstance.post(`${envConfig.baseUrl}/api/auth/logout`, {}, {withCredentials: true})
    .then(response => {
      if (response.status === 200) {
        localStorage.removeItem('userInfo');
        navigate('/login');
      }
      else {
        console.log("Error logging out, please logout again");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }


  return (
    <Nav variant="underline">
      <Nav.Item>
        <Nav.Link href="/timeline">Timeline</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='/friends'>Friends</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='/home'>Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navigation;