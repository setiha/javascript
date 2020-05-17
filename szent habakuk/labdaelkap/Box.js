class Box {

    constructor(game) {
        this.element = document.getElementById('box');
        this.mouseX = null;
        this.game = game;
        game.element.addEventListener('mousemove', ()=>{
            this.SetMouseX(event.clientX);
        });

    }

    SetMouseX(value) {
        if (this.mouseX == value) {
            return;
        }
        this.mouseX = value;
        
        this.UpdatePosition();
    }

    GetWidth() {
        return this.element.clientWidth;
    }


    GetHeight() {
        return this.element.clientHeight;
    }


    UpdatePosition() {

        let elementLeft = this.mouseX - this.GetWidth() / 2;
        elementLeft = Math.max(0, elementLeft);
        elementLeft = Math.min(this.game.GetWidth() - this.GetWidth(), elementLeft);
        this.element.style.left = elementLeft + 'px';
    }


    GetLeftDistance() {
        return this.element.style.left.replace('px','');
    }
}