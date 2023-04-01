import { writable, get } from "svelte/store";

import { Web3Provider } from "@ethersproject/providers";

const PUBLIC_CHAIN_ID = 31337;

export const wallet = writable(null);
export const provider = writable(null);
export const signer = writable(null);
export const errorTx = writable(false);
export const networkDetails = writable({});
export const wrongNetwork = writable(false);
export const gameLoading = writable(true);
export const fatalError = writable(false);

export async function getGasPrice() {
  let gasPrice = null;
  // let maxFeePerGas = null;
  // let maxPriorityFeePerGas = null;
  try {
    const _provider = await get(provider);
    if(!_provider) return;
    const feeData = await _provider.getFeeData();
    gasPrice = String(feeData.gasPrice.mul(2));
    // maxFeePerGas = String(feeData.maxFeePerGas.mul(2));
    // maxPriorityFeePerGas = String(feeData.maxPriorityFeePerGas.mul(2));
  } catch(err) {
    console.log(err);
  }
  return gasPrice;
}

const HEXCHAIN_ID = "0x"+Number(PUBLIC_CHAIN_ID).toString(16);

let web3Modal;
let _provider;
let providerEthcall;

export async function init() {
  const providerOptions = {
    walletconnect: {
      package: window.WalletConnectProvider.default,
      options: {
        // Mikko's test key - don't copy as your mileage may vary
        rpc : { 137: "https://rpc.ankr.com/polygon" },
      }
    },
  };
  
  web3Modal = web3Modal || new window.Web3Modal.default({
    cacheProvider: true, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });

  // provider = await web3Modal.connect();
  if (web3Modal.cachedProvider) {
    _provider = await web3Modal.connect();
    const __p = _provider;
    _provider = new Web3Provider(__p);
    __p.on("chainChanged", (oldNetwork) => {
      if (oldNetwork) {
        setTimeout(() => {
          init();
        }, 0);
      }
    });

    const _signer = await _provider.getSigner();
    const _wallet = await _signer.getAddress();

    __p.on("accountsChanged", (accounts) => {
      if (accounts[0] !== _wallet) {
        setTimeout(() => {
          init();
        }, 0);
      }
    });


    _provider = new Web3Provider(__p);
    provider.set(_provider);

  }


  if (!_provider) {
    _provider = new Web3Provider(window.ethereum, "any");
    provider.set(_provider);
    _provider.on("network", (newNetwork, oldNetwork) => {
      if (oldNetwork) {
        setTimeout(() => {
          init();
        }, 0);
      }
    });
  }
  const _signer = await _provider.getSigner();
  const _wallet = await _signer.getAddress();
  wallet.set(_wallet);
  signer.set(_signer);
   
  
  const _networkDetails = await _provider.getNetwork();
  networkDetails.set(_networkDetails);

}


export async function login() {
  // await gameLoading.set(true);
  try {
    await web3Modal.connect();
    // await window.ethereum.enable();
  } catch(err) {
    // await gameLoading.set(false);
  }
  
  await init();
}

export function disconnect() {
  if (_provider && _provider.close) {
    _provider.close();
  }
  if (web3Modal) {
    web3Modal.clearCachedProvider();
  }
  setTimeout(() => {
    document.location.reload();
  }, 20);
}
