class Ball {

    constructor(game) {
        this.destroyed = false;
        this.game = game;
        this.element = document.createElement('div');
        this.element.className = 'ball';
        game.element.appendChild(this.element);
        this.SetBottomDistance(game.GetHeight() - this.GetHeight());
        this.SetLeftDistance(this.GetRandomLeftDistance())
        this.Fall();
    }

    Fall() {
        if (this.GetBottomDistance() <= 0) {
            this.TriggerFelOff();
            this.Destroy();
            return;
        }

        if (this.GetBottomDistance() <= this.game.box.GetHeight()) {
            this.TriggerFelInline();
        }

        this.SetBottomDistance(this.GetBottomDistance() - 1)
        setTimeout(() => {
            this.Fall();
        }, 5);

    }

    GetWidth() {
        return this.element.clientWidth;
    }

    GetHeight() {
        return this.element.clientHeight;
    }


    GetBottomDistance() {
        return  +this.element.style.bottom.replace('px', '');
    }


    SetBottomDistance(value) {
        this.element.style.bottom = value + 'px';
    }


    SetLeftDistance(value) {
        this.element.style.left = value + 'px';
    }


    GetLeftDistance(value) {
        return +this.element.style.left.replace('px', '');
    }


    GetRandomLeftDistance() {
        return Math.round(Math.random() * (this.game.GetWidth() - this.GetWidth()));
       
    }

    Destroy() {
        this.element.style.display = 'none';
        this.destroyed = true;
    }


    TriggerFelOff() {
        if (this.destroyed) {
            return;
        }
        window.dispatchEvent(new Event('ball/felloff'));
    }


    TriggerFelInline() {
        if (this.destroyed) {
            return;
        }

        window.dispatchEvent(new CustomEvent('ball/fellInLine', { detail: this }));
    }

}