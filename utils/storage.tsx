import { CIDString } from "web3.storage/dist/src/lib/interface";

export function makeGatewayURL(
  cid: CIDString | undefined,
  path: string | undefined
): string {
  return `https://${cid}.ipfs.dweb.link/${encodeURIComponent(path as string)}`;
}

export function jsonFile(filename: string, obj: object): File {
  return new File([JSON.stringify(obj)], filename);
}
