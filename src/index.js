"use strict";

import calc from "./modules/calculate";
import inputValidation from "./modules/calculateValidation";
import togglePopUp from "./modules/modal";
import sendForm1 from "./modules/sendForm1";
import sendForm2 from "./modules/sendForm2";
import sendForm3 from "./modules/sendForm3";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import countTimer from "./modules/timer";
import toggleImg from "./modules/toggleImg";
import toggleMenu from "./modules/toggleMenu";

countTimer("29 june 2020");
toggleMenu();
togglePopUp();
tabs();
slider();
toggleImg();
inputValidation();
calc();
sendForm1();
sendForm2();
sendForm3();
