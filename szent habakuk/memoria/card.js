﻿class Card {
    constructor(value, element) {
        this.value = value;
        this.element = element;
        this.color = 'black';
        this.resolved = false;
        this.blocked = false;


        this.element.addEventListener('click', (event) => {
            this.OnClick();

        });

        window.addEventListener('gameBlocked', () => {
            this.blocked = true;

        });
        window.addEventListener('gameUnBlocked', () => {
            this.blocked = false;

        });
        this.UpdateColor();
    }
    OnClick() {
        if (this.blocked) {
            return
        }
        this.ToggleColor();
        this.TriggerCardClick();
       
    }

    ToggleColor() {
        this.color = (this.color == 'black') ? 'white' : 'black';
        this.UpdateColor();
    }

    UpdateColor() {
        this.element.style.background = this.color;

    }

    TriggerCardClick() {
        let event = new CustomEvent('cardClick',{detail: this});
        window.dispatchEvent(event);
    }

    SetResolved() {
        this.resolved = true;
        this.element.style.visibility = 'hidden';
    }
}
