import _ from "https://deno.land/std@0.120.0/node/module.ts";

const httpGet = async (url) => {
  const data = await fetch(url).then((data) => data.json());
  return data;
};

/*
 * @params {string} '["[\"inj1u3mht6hfscs5laer82802hf28djkv0c35ypcqus796ak8apg9n6qmre3rg\"]"]'
 */

const main = async (input) => {
  const responses = [];
  let userAddress = JSON.parse(input)[0];
  const url = `https://rest.cosmos.directory/injective/cosmos/staking/v1beta1/delegations/${userAddress}`;
  const result = await httpGet(url);
  for (let objectStruct of result.delegation_responses) {
    responses.push({
      account: objectStruct.delegation.validator_address,
      amounts: [Number(objectStruct.balance.amount).toFixed(8).toString()],
    });
  }
  console.log(JSON.stringify(responses));
};

main(...process.argv.slice(2));
