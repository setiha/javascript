class Component {
  constructor(x, y, width, height, color, game, speedX) {
    //pozitio
    this.x = x;
    this.y = y;

    // meretek
    this.width = width;
    this.height = height;

    // kitoltoszin
    this.color = color;

    //jatek
    this.game = game;
    this.context = game.GetContext();

    //sebesseg
    this.speedX = typeof speedX == "undefined" ? 0 : speedX;
    this.speedY = 0;

    //gravitacio

    this.gravity = 0;
    this.gravitySpeed = 0;

    //max pozicio
    this.yMax = game.GetHeight() - this.height;
  }
  Move() {
    //gravitacios sebesseg
    this.gravitySpeed = this.gravitySpeed + this.gravity;
    //pozicio
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY + this.gravitySpeed;
    //korlatok koze zaras

    this.y = Math.min(this.yMax, this.y);
    if (this.y == this.yMax) {
      this.gravitySpeed = 0;
    }
    this.y = Math.max(0, this.y);
    if (this.color == "red" && this.y == 0) {
      this.gravitySpeed = 0.05;
    }

    //kirajzolas
    this.Draw();
  }

  Draw() {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }
  CrashWith(otherComponent) {
    //aktualis elem
    let currentTop = this.y,
      currentRight = this.x + this.width,
      currentBottom = this.y + this.height,
      currentLeft = this.x;

      //masik objektum
      let otherTop = otherComponent.y,
      otherRight = otherComponent.x+ otherComponent.width,
      otherBottom = otherComponent.y + otherComponent.height,
      otherLeft = otherComponent.x;

      //utkozes megallapitasa
      if(otherRight < currentLeft || currentRight < otherLeft || currentBottom < otherTop ||  otherBottom < currentTop) 
       {
        return false;
      }
      return true;
  }
}
