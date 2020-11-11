import React, {Component} from 'react'
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import "./style.css";


class PicChanger extends Component {

    constructor(props){
        super(props);
        this.state={visible: false,
        imagesArray: [props.avatar1, props.avatar2, props.avatar3, props.avatar4, props.avatar5, props.avatar6, props.avatar7, props.avatar8, props.avatar9, ]

        }
    }


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
      const imageMapper = this.state.imagesArray.map((image, index) => {
            return (
                <img src={image}
                    onClick={() => this.props.handleImageChange(image)}
                    />
            )
      })
    return (
        <div>
            <Button id="button2" type="primary" onClick={this.showModal}>Change Profile Picture</Button>
            <Modal
            title=""
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            >
            {imageMapper}
            </Modal>{" "}
        </div>
    );
}
}
export default PicChanger;