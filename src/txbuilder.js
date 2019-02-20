import Web3 from "web3";
import { Wallet, IntentBuilder, IntentAction, DefaultConf } from "marmojs"
import { simpleEncode } from "ethereumjs-abi"

const web3 = new Web3();
const PREFIX = "0x";

/**
 * Get an Ethereum public address from a private key.
 *
 * @param privateKey Private key as 32 bytes hexadecimal string starting 0x
 *
 * @return 0x hexadecimal address or null if the private key is invalid.
 */
export function getAddressFromPrivateKey(privateKey) {
  try {
    let wallet = web3.eth.accounts.privateKeyToAccount(privateKey);
    return wallet.address;
  } catch (e) {
    console.error("Could not parse private key ", privateKey, e);
    return null;
  }
}

/**
 * Create data field based on smart contract function signature and arguments.
 *
 * @param functionSignature E.g. setName(string)
 * @param functionParameters E.g. A comma separated string. Eg. joaquin
 * @returns {string} 0x prefixed hex string
 */
export function encodeDataPayload(functionSignature, functionParameters) {
  const params = functionParameters.split(",").filter((x) => x.trim());
  const signatureArgs = [functionSignature].concat(params);
  return PREFIX + simpleEncode.apply(this, signatureArgs).toString("hex");
}

/**
 * Build a raw transaction calling a marmojs-sdk.
 */
export function buildIntentTx({ dependencies, maxGasLimit, maxGasPrice, expiration, salt, to, value, functionSignature, functionParameters }) {
  DefaultConf.ROPSTEN.asDefault();
  let intentAction = new IntentAction();
  if (to !== '') {
    intentAction.to = to;
  }
  if (value !== '') {
    intentAction.value = value;
  }
  if(functionSignature !== '' && functionParameters !== '') {
    intentAction.data = encodeDataPayload(functionSignature, functionParameters);
  }
  let intentBuilder = new IntentBuilder();
  /*let splitDependencies = []
  if (dependencies !== '') {
    splitDependencies = dependencies.split(",").filter((x) => x.trim());
  }
  intentBuilder.withDependencies(splitDependencies)*/
  intentBuilder.withIntentAction(intentAction)
  if (maxGasLimit !== '') {
    intentBuilder.withMaxGasLimit(maxGasLimit)
  }
  if (maxGasPrice !== '') {
    intentBuilder.withMaxGasPrice(maxGasPrice)
  }
  if (expiration !== '') {
    intentBuilder.withExpiration(expiration)
  }
  if (salt !== '') {
    intentBuilder.withSalt(salt);
  }
  return intentBuilder.build();
}

/**
 * Sign a raw transaction calling a marmojs-sdk.
 */
export function signIntentTx(intent, privateKey) {
  const wallet = new Wallet(privateKey);
  const signedIntent = wallet.sign(intent);
  return signedIntent;
}