import Web3 from "web3";
import { useState, useEffect } from "react";

declare let window: any;

export const useWeb3Api = () => {
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    var instance: any;
    if (window.ethereum) {
      try {
        instance = new Web3(window.ethereum);
      } catch (error) {
        console.log(error);
      }
    } else {
      const provider: any = new Web3(window.web3);
      instance = new Web3(provider);
    }
    setWeb3(instance);
  }, []);

  return web3;
};
