import type { AxiosInstance } from "axios";
import type { LoDashStatic } from "lodash";

declare interface ApplicationStore {

}

declare global {
  interface Window {
    axios: AxiosInstance;
    _: LoDashStatic;
    store: ApplicationStore;
    random: {
      boolean: () => boolean
    };
    $: JQueryStatic
  }
}

export enum CellType {
  infected = 'infected',
  dead = 'dead',
  healthy = 'healthy'
}