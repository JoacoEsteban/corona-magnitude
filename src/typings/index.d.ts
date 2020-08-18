import type { AxiosInstance } from "axios";

declare interface ApplicationStore {
  
}

declare global {
  interface Window {
    axios: AxiosInstance,
    store: ApplicationStore
  }
}
