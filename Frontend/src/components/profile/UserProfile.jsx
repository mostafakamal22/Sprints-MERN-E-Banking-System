import { useSelector } from "react-redux";
import ProfileInfo from "./ProfileInfo";
import ProfileSummery from "./ProfileSummery";

export const UserProfile = () => {
  const info = useSelector((state) => state.userData.info);

  return (
    <div className="max-w-4xl w-full self-start">
      {/*profile summery */}
      <ProfileSummery info={info} />

      <div className="my-10"></div>

      {/* Profile Info section */}
      <ProfileInfo info={info} />
    </div>
  );
};
