import Web3 from "web3";
import { IntentBuilder, IntentAction, MamorUtils } from "marmojs-sdk"
 
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
    let wallet = web3.eth.accounts.privateKeyToAccount(privateKey);
    return wallet.address;
  } catch (e) {
    console.error("Could not parse private key ", privateKey, e);
    return null;
  }
}

/**
 * Build a raw transaction calling a marmojs-sdk.
 *
 */
export function buildIntentTx({ signer, dependencies, contractAddress, minGasLimit, maxGasPrice, expiration, salt, to, value, functionSignature, functionParameters }) {

  let intentAction = new IntentAction();
  intent.setTo(to);
  intent.setValue(value);
  intent.setData(MamorUtils.encodeDataPayload(functionSignature, functionParameters));

  let intentBuilder = new IntentBuilder();
  intentBuilder.withSigner(signer)
    .withDependencies(dependencies.split(",").filter((x) => x.trim()))
    .withWallet(contractAddress)
    .withIntentAction(intentAction)
    .withMinGasLimit(minGasLimit)
    .withMaxGasLimit(maxGasPrice)
    .withExpiration(expiration)
    .withSalt(salt);


  let intent = intentBuilder.build();
  return intent;

}