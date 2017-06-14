
    import {getCookies, multiElementAction} from './stormScripts';

    const userLevel = getCookies().jwt[1].level || 0;

    if (userLevel >= 1) {

        multiElementAction(document.getElementsByClassName("mustBeLoggedIn"),
          (elt: HTMLElement) => elt.style.display = "block");

        let levels = "";

        for (let i = 1; i <=userLevel; i++) {

            levels += `<option value="${i}">${i}</option>`;
        }

        document.getElementsByName("lvl")[0].innerHTML = levels;
    }
