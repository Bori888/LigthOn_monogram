export class Lampa {
    constructor(id, szuloElem) {
        this.id = id;
        this.allapot = Math.random() < 0.2; // 20% eséllyel bekapcsolva
        this.divElem = document.createElement('div');
        this.divElem.classList.add('lampa');
        this.szuloElem = szuloElem;
        this.szuloElem.appendChild(this.divElem);
        this.setAllapotMegjelenites();

        this.divElem.addEventListener('click', () => {
            this.#sajatEsemenyKezelo();
        });
    }

    setAllapotMegjelenites() {
        if (this.allapot) {
            this.divElem.classList.add('bekapcsolt');
            this.divElem.classList.remove('kikapcsolt');
        } else {
            this.divElem.classList.add('kikapcsolt');
            this.divElem.classList.remove('bekapcsolt');
        }
    }

    allapotValt() {
        this.allapot = !this.allapot;
        this.setAllapotMegjelenites();
    }

    #sajatEsemenyKezelo() {
        const esemeny = new CustomEvent('lampaKattintas', { detail: this });
        window.dispatchEvent(esemeny);
    }
}
