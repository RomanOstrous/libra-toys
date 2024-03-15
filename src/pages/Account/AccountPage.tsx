import LogOut from "../../components/LogOut/LogOut";
import UserInfo from "../../components/UserInfo/UserInfo";
import './Account.scss';

export const AccountPage = () => {
  return (
    <>
      <div className="account container grid">
        <h1 className="account__title"> Акаунт </h1>
        <div className="account__container grid__item--desktop-1-4 grid__item--tablet-1-4">
          <UserInfo />
          
          <LogOut />
        </div>
      </div>
    </>
  );
};
