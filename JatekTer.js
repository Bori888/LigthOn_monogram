import { Lampa } from "./Lampa.js";

export class JatekTer {
    constructor(szuloElem, meret) {
        this.szuloElem = szuloElem;
        this.meret = meret;
        this.lampak = [];
        this.lekapcsoltDb = 0;

        this.#lampaHalmazLetrehozasa();

        window.addEventListener('lampaKattintas', (event) => {
            this.#szomszedokValtoztatasa(event.detail.id);
            this.#gyozelmiVizsgalat();
        });
    }

    #lampaHalmazLetrehozasa() {
        this.szuloElem.innerHTML = '';
        this.lampak = [];
        for (let i = 0; i < this.meret * this.meret; i++) {
            const lampa = new Lampa(i, this.szuloElem);
            this.lampak.push(lampa);
        }
        this.#lekapcsoltSzamlaloFrissites();
    }

    #szomszedokValtoztatasa(id) {
        const sor = Math.floor(id / this.meret);
        const oszlop = id % this.meret;

        const szomszedok = [
            [sor, oszlop],        // Saját maga
            [sor - 1, oszlop],    // Felső
            [sor + 1, oszlop],    // Alsó
            [sor, oszlop - 1],    // Bal
            [sor, oszlop + 1]     // Jobb
        ];

        szomszedok.forEach(([s, o]) => {
            if (s >= 0 && s < this.meret && o >= 0 && o < this.meret) {
                const index = s * this.meret + o;
                this.lampak[index].allapotValt();
            }
        });

        this.#lekapcsoltSzamlaloFrissites();
    }

    #lekapcsoltSzamlaloFrissites() {
        const lekapcsolt = this.lampak.filter(l => !l.allapot).length;
        document.getElementById('lekapcsoltSzamlalo').textContent = lekapcsolt;
    }

    #gyozelmiVizsgalat() {
        if (this.lampak.every(l => !l.allapot)) {
            document.getElementById('uzenet').textContent = "Hurrá, meghosszabbítottad a Föld életét!";
        } else {
            document.getElementById('uzenet').textContent = "";
        }
    }
}
