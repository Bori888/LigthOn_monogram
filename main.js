import { JatekTer } from "./JatekTer.js";

let jatek;

function init() {
    const jatekTerElem = document.getElementById('jatekter');
    jatek = new JatekTer(jatekTerElem, 3);

    document.getElementById('ujJatekGomb').addEventListener('click', () => {
        jatek = new JatekTer(jatekTerElem, 3);
        document.getElementById('uzenet').textContent = "";
    });
}

window.addEventListener('load', init);
