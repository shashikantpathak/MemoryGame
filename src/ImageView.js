import React, { Component } from 'react';
import './Game.css';

class ImageView extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
// check the match on click and flipped 
  onClick() {
    if (!this.props.matched && !this.props.flipped) {
      this.props.onClick(this.props.id,this.props.image);      
    }
  }

  render() {
//     define the path of images store
    let imagePath = './images/';
    if (this.props.flipped) {
      imagePath = imagePath + this.props.image + '.gif';
    } else {
      imagePath = imagePath + 'back.gif';
    }

    let className='Card';
    if (this.props.matched) {
      className = className + ' Matched';
    }

    return (
        <img className={className} src={require(`${imagePath}`)} alt='' onClick={this.onClick}/>
    );      
  };
};

export default ImageView;
