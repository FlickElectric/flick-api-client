declare module 'flick-api-client' {
  export function deserialize(args: DeserializeArguments): any;

  interface DeserializeArguments {
    data: any;
    included: string;
  }
}