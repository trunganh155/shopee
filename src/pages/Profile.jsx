import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IoCamera } from "react-icons/io5";
import Loading from "../components/Loading";
import "../styles/Profile.scss";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const { profile } = useSelector((state) => state.profileReducer); //lay profile tu redux len
  const [avatar, setAvatar] = useState(profile.avatar); //avt mac dinh lay tu redux len
  const [data, setData] = useState(profile);
  //const formData = new FormData();

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);

    //formData.append("File", e.target.files[0]);

    setAvatar(file);
    setData({ ...data, avatar: file });
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios({
        method: "put",
        url: "https://k24-server-1.herokuapp.com/user",
        data: {
          name: data.name,
          address: data.address,
          //avatar: data.avatar,
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWFLP-G1MZF20B18zKRTYtngwjUnqFgPi9jA&usqp=CAU",
          //"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD3TDQBB-_F1sfu-gElz73vtUAdlOdLerHDw&usqp=CAU",
        },
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background">
      {loading && <Loading />}
      <div className="profile">
        <section className="profile__title">
          <span style={{ textTransform: "capitalize", fontSize: "25px" }}>
            Hồ sơ của tôi
          </span>
          <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
        </section>
        <div className="profile__main">
          <section className="profile__main__edit">
            <div className="form">
              <div className="group">
                <label>SĐT:</label>
                <input readOnly type="text" defaultValue={profile.phone} />
              </div>
              <div className="group">
                <label>Tên:</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => {
                    setData({ ...data, name: e.target.value });
                  }}
                />
              </div>
              <div className="group">
                <label>Địa chỉ:</label>
                <input
                  type="text"
                  value={data.address}
                  onChange={(e) => {
                    setData({ ...data, address: e.target.value });
                    console.log(e.target.value);
                  }}
                />
              </div>
              <button className="btnUpdate" onClick={updateProfile}>
                Lưu
              </button>
            </div>
          </section>
          <section className="profile__main__avatar">
            {avatar && <img src={avatar.preview || avatar} alt="avt" />}
            <div className="changeAvatar">
              <IoCamera />
              <input
                type="file"
                accept="image/*"
                onChange={handleChangeAvatar}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
