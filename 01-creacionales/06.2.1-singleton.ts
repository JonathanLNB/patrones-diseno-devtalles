/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

import {configManager} from "./singleton/config-manager.ts";
import {COLORS} from "../helpers/colors.ts";

configManager.setConfig("apiURL", "http://localhost:8080");
configManager.setConfig("timeout", "5000");
configManager.setConfig("apiKey", "123ABC");

console.log(`%c${configManager.getConfig("apiURL")}`, COLORS.green);
console.log(`%c${configManager.getConfig("timeout")}`, COLORS.green);
console.log(`%c${configManager.getConfig("apiKey")}`, COLORS.green);
