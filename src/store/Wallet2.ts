import { writable, get } from "svelte/store";

import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";

import { formatBytes32String, parseBytes32String} from "@ethersproject/strings";

// https://kit.svelte.dev/docs/modules#$env-static-public
import { PUBLIC_CONTRACT_PROFILE } from '$env/static/public';


export const contractProfile = writable(null);
export const profile = writable(null);
export const wallet = writable(null);
export const provider = writable(null);
export const signer = writable(null);
export const errorTx = writable(false);
export const networkDetails = writable({});
export const wrongNetwork = writable(false);
export const gameLoading = writable(true);
export const fatalError = writable(false);

let web3Modal;
let _provider;

export async function init() {
  const providerOptions = {
    walletconnect: {
      package: window.WalletConnectProvider.default,
      options: {
        // Mikko's test key - don't copy as your mileage may vary
        rpc : { 31337: "http://localhost:8545" },
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
  debugger;
  const _signer = await _provider.getSigner();
  const _wallet = await _signer.getAddress();
  wallet.set(_wallet);
  signer.set(_signer);


  const abi = [
    'function addressToUsername(address user) public view returns (bytes32)'
  ]
  const _profileNft = new Contract(PUBLIC_CONTRACT_PROFILE, abi, _signer);
  contractProfile.set(_profileNft);

  let n = await _profileNft.addressToUsername(_wallet);
  n = (parseBytes32String(n)).trim();
  n = n === "" ? null : n; 
  
  profile.set(n);
  
  const _networkDetails = await _provider.getNetwork();
  networkDetails.set(_networkDetails);

}


export async function login() {
  // await loading.set(true);
  try {
    await web3Modal.connect();
    // await window.ethereum.enable();
  } catch(err) {
    // await loading.set(false);
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
