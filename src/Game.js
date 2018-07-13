import React, { Component } from 'react';
import ImageView from './ImageView';
import MemoryOfImage from './MemoryOfImage';
import './Game.css';

import 'font-awesome/css/font-awesome.min.css';
class Game extends Component {
  constructor(props) {
    super(props);
    this.onImageClicked = this.onImageClicked.bind(this);
    this.Restart = this.Restart.bind(this);
    this.memoryOfImage= new MemoryOfImage();
  }

  componentWillMount() {
    this.startGame();
  }

  startGame() {
    this.memoryOfImage.generateImageSet();
    this.setState({
      moves : 0,
      pairsMatched : 0,
      numberofClick : 0,
      firstId : undefined,
      secondId : undefined,
      count:0
    });
  }

  getImageViews() {
    let ImageViews = [];
    let onClick = this.onImageClicked;
    this.memoryOfImage.arrayOfImages.forEach(c => {
      let imageView = <ImageView key={c.id} 
          id={c.id} 
          image={c.image}
          flipped = {c.flipped}
          matched = {c.matched} 
          onClick={onClick}/>;
          ImageViews.push(imageView);
    });
    return ImageViews;
  }

  ResetImageArray(id1,id2) {
    if (this.state.numberofClick !== 2) {
      return;
    }
    this.memoryOfImage.flipCard(this.state.firstId, false);
    this.memoryOfImage.flipCard(this.state.secondId, false);
    this.setState({
      firstId: undefined,
      secondId: undefined,
      numberofClick: 0,
      moves : this.state.moves+1
    });
  }

  onImageClicked(id,image) {
    if (this.state.numberofClick === 0 || this.state.numberofClick === 2) {
      if (this.state.numberofClick === 2) {
        clearTimeout(this.timeout);
        this.ResetImageArray(this.state.firstId, this.state.secondId);        
      }
      this.memoryOfImage.flipCard(id, true);
      this.setState({
        firstId : id,
        numberofClick : 1
      });
    } else if (this.state.numberofClick === 1) {
      this.memoryOfImage.flipCard(id, true);
      this.setState({
        secondId : id,
        numberofClick : 2
      });

      if (this.memoryOfImage.IdenticalMatchImages(id, this.state.firstId)) {
        this.memoryOfImage.setImageAsMatched(this.state.firstId, true);
        this.memoryOfImage.setImageAsMatched(id, true);
        this.setState({
          pairsMatched: this.state.pairsMatched+1,
          firstId: undefined,
          secondId: undefined,
          moves : this.state.moves+1,
          numberofClick: 0
        });

      } else {
        this.timeout = setTimeout(() => { 
          this.ResetImageArray(this.state.firstId, this.state.secondId);
        },5000); 
      }

    }
  }

  Restart() {
    this.startGame();
  }

  render() {
    let ImageViews = this.getImageViews();
    let gameStatus = <div className='Game-status'>
                      <div >Moves: {this.state.moves}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    
                      <div >Match found: {this.state.pairsMatched}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                      <div class="reset" onClick={this.Restart}>Restart<i className="fab fa-creative-commons-sa"></i></div>
                    </div>;

    if (this.state.pairsMatched === this.memoryOfImage.total_Images) {
      gameStatus = <div className='Game-complete'>
                    <div>GAME COMPLETE!&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div>You used {this.state.moves-1} moves &nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div><button onClick={this.Restart}>Try again</button></div>
                   </div>;      
    }

    return (
      <div className='Game'>
        <header className='Game-header'>
          <div className='Game-title'>Memory Game</div>
        </header>
        <div>
          {gameStatus}
        </div>
        <div className='ImageContainer'>
          {ImageViews}
        </div>
      </div>
    );
  }
}

export default Game;
