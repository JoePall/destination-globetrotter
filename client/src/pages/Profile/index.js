import React, {Component} from "react";
import PicChanger from "../../components/imageUpload/"
import "./style.css";
import 'antd/dist/antd.css';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Avatar1 from "../../components/imageUpload/Avatars/avatar1.png"
import Avatar2 from "../../components/imageUpload/Avatars/avatar2.png"
import Avatar3 from "../../components/imageUpload/Avatars/avatar3.png"
import Avatar4 from "../../components/imageUpload/Avatars/avatar4.png"
import Avatar5 from "../../components/imageUpload/Avatars/avatar5.png"
import Avatar6 from "../../components/imageUpload/Avatars/avatar6.png"
import Avatar7 from "../../components/imageUpload/Avatars/avatar7.png"
import Avatar8 from "../../components/imageUpload/Avatars/avatar8.png"
import Avatar9 from "../../components/imageUpload/Avatars/avatar9.png"

class Profile extends Component {
  constructor(props){
    super(props);
      this.state={
        profileImage: ''
      }
    }

    handleImageChange = (profileImage) => {
      this.setState({
        profileImage
      })
    }

  render(){
  return (
    <div className="form">
      <form className="field">
      <div className="card-content">

        <Avatar size={175} icon={<UserOutlined />} src={this.state.profileImage} />
        <PicChanger handleImageChange={this.handleImageChange} avatar1={Avatar1} avatar2={Avatar2} avatar3={Avatar3} avatar4={Avatar4} avatar5={Avatar5} avatar6={Avatar6} avatar7={Avatar7} avatar8={Avatar8} avatar9={Avatar9} />

          <h2 className="">Joe Example</h2>
                <p><i className=""></i> mail@domain.com</p>
      </div>
  </form>
</div>
  );
}
}

export default Profile;