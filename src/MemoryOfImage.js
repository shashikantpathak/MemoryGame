import shuffle from 'shuffle-array';

class MemoryOfImage {
  constructor() {
    this.arrayOfImages = [];
    this.total_Images = 10;
  }
// store the images 
  generateImageSet() {
   
    this.arrayOfImages = [];
    let id=1;
    for(let i=1; i <= this.total_Images; i++) {
      let image1 = {
        id: id,
        image : i,
        flipped: false,
        matched: false
      };
      id++;
      let image2 = {
        id: id,
        image : i,
        flipped: false,
        matched: false
      };
      this.arrayOfImages.push(image1);
      this.arrayOfImages.push(image2);
      id++;
    }
//     shuffle the images on start of game
    shuffle(this.arrayOfImages);  
  }
// get the id of particular image on click
  getImage(id) {
    for(let i=0; i < 2*this.total_Images; i++) {
      if (this.arrayOfImages[i].id === id) {
        return this.arrayOfImages[i];
      }
    };
  }

  flipCard(id, flipped) {
    this.getImage(id).flipped = flipped;
  }
// check if image pair is found
  setImageAsMatched(id, matched) {
    this.getImage(id).matched = matched;
  }

  IdenticalMatchImages(id1, id2) {
    if (this.getImage(id1).image === this.getImage(id2).image) {
      return true;
    } else {
      return false;
    }
  }

};

export default MemoryOfImage;
