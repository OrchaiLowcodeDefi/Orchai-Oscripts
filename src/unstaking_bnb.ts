import { ethers } from "npm:ethers@5.7.2";
import { CosmWasmClient } from "npm:@cosmjs/cosmwasm-stargate@^0.29.5"

interface UnstakeRequest {
  id: number;
  amount: string;
}

const stakingAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "returnAmount",
        "type": "uint256"
      }
    ],
    "name": "Stake",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "ts",
        "type": "uint256"
      }
    ],
    "name": "Unstake",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "executor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "time",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newExchangeRate",
        "type": "uint256"
      }
    ],
    "name": "UpdateExchangeRate",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "DECIMAL_PLACE",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_USER_UNSTAKE_RQ",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_executor",
        "type": "address"
      }
    ],
    "name": "addExecutor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bridgeFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newBridgeFee",
        "type": "uint256"
      }
    ],
    "name": "changeBridgeFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_newDestination",
        "type": "string"
      }
    ],
    "name": "changeDestination",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newExchangeRateThreshold",
        "type": "uint256"
      }
    ],
    "name": "changeExchangeRateThreshold",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newExchangeRateTimeframe",
        "type": "uint256"
      }
    ],
    "name": "changeExchangeRateTimeframe",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newOraiBridge",
        "type": "address"
      }
    ],
    "name": "changeOraiBridgeAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newLimitStake",
        "type": "uint256"
      }
    ],
    "name": "changeStakeLimit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newUnbondingPeriod",
        "type": "uint256"
      }
    ],
    "name": "changeUnbondingPeriod",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "destination",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "executors",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_unbonding_period",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_exchangeRateTimeframe",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_exchangeRateThreshold",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_oraiAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_scOraiAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_destination",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_oraiBridge",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "lastUnstakeClaimedIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lastUnstakingRequestId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "limitStake",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "oraiAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "oraiBridge",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "ownerToUnstakingList",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "queryUnstakingRequest",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "ts",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isClaimed",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "returnAmount",
            "type": "uint256"
          }
        ],
        "internalType": "struct DataTypes.UnstakingRequest",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "queryUnstakingRequestsOfUser",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "queryUnstakingRequestsUnclaimedOfUser",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "queryUnstakingWithdrawableOfUser",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_executor",
        "type": "address"
      }
    ],
    "name": "removeExecutor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "scOraiAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "stake",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "stakingInfo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "exchangeRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastUpdateExchangeRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "unbondingPeriod",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "exchangeRateTimeframe",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "exchangeRateThreshold",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "unstake",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "unstakingRequests",
    "outputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "ts",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isClaimed",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "returnAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newExchangeRate",
        "type": "uint256"
      }
    ],
    "name": "updateExchangeRate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawUnstaked",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const rpcProvider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org:443");
const stakingContract = new ethers.Contract(
  "0xa5263e756234d4d516930dc07290ef1f35e15111",
  stakingAbi,
  rpcProvider
)

async function getLastUnstakingIdBNB(): Promise<number> {
  return await stakingContract.lastUnstakingRequestId();
}

async function getLastUnstakingIdOraichain(): Promise<number> {
  const client = await CosmWasmClient.connect("https://rpc.orai.io");
  const result = await client.queryContractSmart(
    "orai17sy5njqjt2skvk3d9pxtywsvjf2rasnfhkptsg8xc57v35tdkluqhd3t5l",
    {
      last_unstaking_id: {},
    }
  );
  return result;
}

const main = async () => {
  try {
    const [lastUnstakingIdBNB, lastUnstakingIdOraichain] = await Promise.all([
      getLastUnstakingIdBNB(),
      getLastUnstakingIdOraichain(),
    ]);

    let requests: UnstakeRequest[] = [];

    let promises: Promise<UnstakeRequest>[] = [];

    if (lastUnstakingIdBNB > lastUnstakingIdOraichain) {
      for (let i = lastUnstakingIdOraichain + 1; i <= lastUnstakingIdBNB; ++i) {
        let promise = (async (): Promise<UnstakeRequest> => {
          let unstakeRequest = await stakingContract.unstakingRequests(i);
          return {
            id: i,
            amount: String(Number(unstakeRequest.amount) / Number(1e12)),
          };
        })();
        promises.push(promise);
      }
    }
    requests = await Promise.all(promises);
    console.log(JSON.stringify(requests));
  } catch (err) {
    console.log(err);
  }
}

main()