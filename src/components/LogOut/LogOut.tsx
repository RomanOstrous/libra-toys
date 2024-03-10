import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hook";
import { actions } from "../../app/authSlice";

export default function LogOut() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logOut = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    dispatch(actions.logout())
    navigate('/');
  }

  return (
    <div>
      <button onClick={logOut}>
        LogOut
      </button>
    </div>
  );
};
