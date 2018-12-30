import Wallet from "ethers-wallet";
import {simpleEncode} from "ethereumjs-abi";
import Web3 from "web3";

const web3 = new Web3();

/**
 * Get an Ethereum public address from a private key.
 *
 * @param privateKey Private key as 32 bytes hexadecimal string starting 0x
 *
 * @return 0x hexadecimal address or null if the private key is invalid.
 */
export function getAddressFromPrivateKey(privateKey) {
  try {
    let wallet = web3.eth.accounts.privateKeyToAccount(privateKey)//new Wallet(privateKey);
    return wallet.address;
  } catch (e) {
    console.error("Could not parse private key ", privateKey, e);
    return null;
  }
}

/**
 * Create data field based on smart contract function signature and arguments.
 *
 * @param functionSignature E.g. setValue(uint256)
 * @param functionParameters E.g. A comma separated string. Eg. 200,300
 * @returns {string} 0x prefixed hex string
 */
export function encodeDataPayload(functionSignature, functionParameters) {

  if(typeof functionSignature != "string") {
    throw new Error("Bad function signature: " + functionSignature);
  }

  if(typeof functionParameters != "string") {
    throw new Error("Bad function parameter: " + functionSignature);
  }

  const params = functionParameters.split(",").filter((x) => x.trim());
  const signatureArgs = [functionSignature].concat(params);
  return "0x" + simpleEncode.apply(this, signatureArgs).toString("hex");
}

/**
 * Build a raw transaction calling a contract function.
 *
 */
export function buildTx({}) {

  // TODO: call marmojs-sdk
}