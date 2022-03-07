export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_PASSWORD: string;
      MONGODB_USER: string;
      MONGODB_CLUSTER: string;
      JWT_PRIVATE_KEY: string;
    }
  }
}

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};
