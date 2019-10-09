import { Engine } from "./core/engine";
import "./styles/main.scss";

/**
 * Init hyperbolic canvas engine on page load.
 */
window.onload = () => {
  new Engine().createLoop();;
};
