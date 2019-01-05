import Web3 from "web3";
import { IntentBuilder, IntentAction, encodeDataPayload } from "marmojs-sdk"
 
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
export function buildIntentTx({ signer, dependencies, minGasLimit, maxGasPrice, expiration, salt, tokenContractAddress, value, functionSignature, functionParameters }) {

  let intentAction = new IntentAction();
  if (tokenContractAddress !== undefined) {
    intentAction.setTo(tokenContractAddress);
  }
  if (value !== undefined) {
    intentAction.setValue(value);
  }
  if(functionSignature!==null && functionParameters!== null) {
    intentAction.setData(encodeDataPayload(functionSignature, functionParameters));
  }

  let intentBuilder = new IntentBuilder();
  if (signer !== undefined) {
    intentBuilder.withSigner(signer);
  }
  if (dependencies !== undefined) {
    let splitDependencies = dependencies.split(",").filter((x) => x.trim());
    intentBuilder.withDependencies(splitDependencies)
  }
  intentBuilder.withIntentAction(intentAction)
  if (minGasLimit !== undefined) {
    intentBuilder.withMinGasLimit(minGasLimit)
  }
  if (maxGasPrice !== undefined) {
    intentBuilder.withMaxGasLimit(maxGasPrice)
  }
  if (expiration !== undefined) {
    intentBuilder.withExpiration(expiration)
  }
  if (salt !== undefined) {
    intentBuilder.withSalt(salt);
  }


  let intent = intentBuilder.build();
  console.log()
  return intent;

}