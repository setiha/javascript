class Game {
  constructor() {
    //jatekter
    this.canvas = document.getElementById("game");
    this.canvas.width = 500;
    this.canvas.height = 350;

    //madar
    this.bird = new Component(10, 0, 20, 20, "red", this);
    this.SetBirdGravity(0.05);

    //akadalyok
    this.obstacleCollection = [];
    this.minUpperHeight = 20;
    this.maxUpperHeight = 200;
    this.minGap = 50;
    this.maxGap = 100;
    this.obstacleWidth = 30;

    //idozito
    this.tickCounter = 0;
    this.interval = setInterval(() => {
      this.Update();
    }, 20);

    //feliratkozas
    window.addEventListener("keydown", event => {
      if (event.code == "Space") {
        this.SetBirdGravity(-0.2);
      }
    });

    window.addEventListener("keyup", event => {
      if (event.code == "Space") {
        this.SetBirdGravity(0.05);
      }
    });
  }

  Update() {
    //game over vozsgalat
    if(this.IsGameOver()){
      clearInterval(this.interval);
      alert('Game over');
      return; 
    }
    //takaritas
    this.Clear();

    // uj akadalyok felvetele akadalyok
    if (this.tickCounter % 150 == 0) {
      //felso akadaly magassaga
      let upperHeight =
        this.minUpperHeight +
        Math.round(Math.random() * (this.maxUpperHeight - this.minUpperHeight));
      //terkoz
      let gap =
        this.minGap + Math.round(Math.random() * (this.maxGap - this.minGap));
      //also akadaly magassaga
      let lowerHeight = this.GetHeight() - upperHeight - gap;

      //elemek felvetele
      this.obstacleCollection.push(new Component(
        this.GetWidth(), 0, this.obstacleWidth, upperHeight, 'green', this, -1
      ));

      this.obstacleCollection.push(new Component(
        this.GetWidth(), upperHeight + gap, this.obstacleWidth, lowerHeight, 'green', this,-1
      ));

    }
//akadalyok kirajzolasa
    this.obstacleCollection.forEach(obstacle => {
      obstacle.Move();
    });
    //madar mozgatas
    this.bird.Move();

    //idozites
    this.tickCounter++;
  }

  IsGameOver(){
    for (let index = 0; index < this.obstacleCollection.length; index++) {
      if(this.bird.CrashWith(this.obstacleCollection[index])){
        return true;
      }      
    }
    return false;  
  }
    
  Clear() {
    this.GetContext().clearRect(0, 0, this.GetWidth(), this.GetHeight());
    
    
  }
  GetWidth() {
    return this.canvas.width;
  }

  GetHeight() {
    return this.canvas.height;
  }

  GetContext() {
    return this.canvas.getContext("2d");
  }
  SetBirdGravity(newGravity) {
    this.bird.gravity = newGravity;
  }
}
