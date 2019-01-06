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
  if (tokenContractAddress !== '') {
    intentAction.setTo(tokenContractAddress);
  }
  if (value !== '') {
    intentAction.setValue(value);
  }
  if(functionSignature !== '' && functionParameters !== '') {
    intentAction.setData(encodeDataPayload(functionSignature, functionParameters));
  }
  let intentBuilder = new IntentBuilder();
  if (signer !== '') {
    intentBuilder.withSigner(signer);
  }
  if (dependencies !== '') {
    let splitDependencies = dependencies.split(",").filter((x) => x.trim());
    intentBuilder.withDependencies(splitDependencies)
  }
  intentBuilder.withIntentAction(intentAction)
  if (minGasLimit !== '') {
    intentBuilder.withMinGasLimit(minGasLimit)
  }
  if (maxGasPrice !== '') {
    intentBuilder.withMaxGasLimit(maxGasPrice)
  }
  if (expiration !== '') {
    intentBuilder.withExpiration(expiration)
  }
  if (salt !== '') {
    intentBuilder.withSalt(salt);
  }
  return intentBuilder.build();

}