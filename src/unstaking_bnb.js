import _ from "https://deno.land/std@0.120.0/node/module.ts";
import { ethers } from "npm:ethers@5.5.1";
// import { CosmWasmClient } from "npm:@cosmjs/cosmwasm-stargate@0.28.13"

const httpGet = async (url) => {
  const data = await fetch(url).then(data => data.json());
  return data;
}

// const stakingAbi = [
//   {
//     "inputs": [],
//     "name": "lastUnstakingRequestId",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "name": "unstakingRequests",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "user",
//         "type": "address"
//       },
//       {
//         "internalType": "uint256",
//         "name": "amount",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "ts",
//         "type": "uint256"
//       },
//       {
//         "internalType": "bool",
//         "name": "isClaimed",
//         "type": "bool"
//       },
//       {
//         "internalType": "uint256",
//         "name": "returnAmount",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
// ]

// const rpcProvider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org:443");
// const stakingContract = new ethers.Contract(
//   "0xa5263e756234d4d516930dc07290ef1f35e15111",
//   stakingAbi,
//   rpcProvider
// )

// async function getLastUnstakingIdBNB() {
//   return await stakingContract.lastUnstakingRequestId();
// }

// async function getLastUnstakingIdOraichain() {
//   const client = await CosmWasmClient.connect("https://rpc.orai.io");
//   const result = await client.queryContractSmart(
//     "orai17sy5njqjt2skvk3d9pxtywsvjf2rasnfhkptsg8xc57v35tdkluqhd3t5l",
//     {
//       last_unstaking_id: {},
//     }
//   );
//   return result;
// }

const main = async (argvParams) => {
  // const lastStakingBNB = await getLastUnstakingIdBNB();
  const result = await httpGet("https://lcd.orai.io/cosmwasm/wasm/v1/contract/orai17sy5njqjt2skvk3d9pxtywsvjf2rasnfhkptsg8xc57v35tdkluqhd3t5l/smart/eyJsYXN0X3Vuc3Rha2luZ19pZCI6e319");
  console.log(JSON.stringify(result));
  // const [lastUnstakingIdBNB, lastUnstakingIdOraichain] = await Promise.all([
  //   getLastUnstakingIdBNB(),
  //   getLastUnstakingIdOraichain(),
  // ]);

  // console.log(lastUnstakingIdBNB, lastUnstakingIdOraichain);

  // let requests = [];

  // let promises = [];

  // if (lastUnstakingIdBNB > lastUnstakingIdOraichain) {
  //   for (let i = lastUnstakingIdOraichain; i <= lastUnstakingIdBNB; ++i) {
  //     let promise = (async () => {
  //       let unstakeRequest = await stakingContract.unstakingRequests(i);
  //       return {
  //         id: String(i),
  //         amount: String(Number(unstakeRequest.amount) / Number(1e12)),
  //       };
  //     });
  //     promises.push(promise);
  //   }
  // }
  // requests = await Promise.all(promises);
  // console.log(JSON.stringify(requests));
}

main(...process.argv.slice(2))