import _ from "https://deno.land/std@0.120.0/node/module.ts";

const httpGet = async (url) => {
  const data = await fetch(url).then((data) => data.json());
  return data;
};

const getPrice = async (url, count) => {
  try {
    // if (count > 10) return null;
    const result = await httpGet(url);
    const resultObj = result;
    return resultObj;
  } catch (error) {
    // console.log("Error");
    // setTimeout(getPrice, 5000, url, count + 1);
  }
};

const getExchangeRate = async (url, count2) => {
  try {
    // if (count2 > 10) return null;
    const result = await httpGet(url);
    const exchangeRate = result.host_zone.redemption_rate;
    return exchangeRate;
  } catch (error) {
    // console.log("Error");
    // setTimeout(getPrice, 5000, url, count2 + 1);
  }
};

const main = async (symbols) => {
  const responses = [];
  const listSymbols = JSON.parse(JSON.parse(symbols)[0]);

  const symbolMapping = {
    USDT: "USDT",
    ORAI: "ORAI-token",
    ATOM: "ATOM",
    STATOM: "ATOM",
    OSMO: "OSMO",
    STOSMO: "OSMO",
    INJ: "INJ",
    OCH: "OCH",
    BTC: "BTC",
    ETH: "ETH",
    ORAIX: "ORAIX",
  };

  for (let i = 0; i < listSymbols.length; i++) {
    try {
      let _name = ``;
      let _price = ``;
      if (listSymbols[i] == `ORAI`) {
        const url = `https://pricefeed.oraichainlabs.org/`;
        const fetchData = await httpGet(url);
        _name = fetchData.token;
        _price = [fetchData.price.toFixed(8).toString()];
      } else if (listSymbols[i] == `USDT`) {
        _name = listSymbols[i];
        _price = ["1.000000"];
      } else if (["OCH", "BTC", "ORAIX"].includes(listSymbols[i])) {
        const resultObj = await getPrice(
          `https://api.orchai.io/lending/mainnet/token/${
            symbolMapping[listSymbols[i]]
          }`
        );
        let priceUsd = parseFloat(resultObj.current_price).toFixed(8);
        _name = listSymbols[i];
        _price = [priceUsd];
      } else {
        const resultObj = await getPrice(
          `https://api-osmosis.imperator.co/tokens/v2/price/${
            symbolMapping[listSymbols[i]]
          }`
        );
        if (!("message" in resultObj)) {
          let exchangeRate = 1;
          if (listSymbols[i] == "STATOM") {
            exchangeRate = parseFloat(
              await getExchangeRate(
                "https://stride-api.polkachu.com/Stride-Labs/stride/stakeibc/host_zone/cosmoshub-4"
              )
            ).toFixed(8);
          } else if (listSymbols[i] == "STOSMO") {
            exchangeRate = parseFloat(
              await getExchangeRate(
                "https://stride-api.polkachu.com/Stride-Labs/stride/stakeibc/host_zone/osmosis-1"
              )
            ).toFixed(8);
          }
          let priceUsd = parseFloat(resultObj.price).toFixed(8);
          priceUsd = priceUsd * exchangeRate;
          _name = listSymbols[i];
          _price = [parseFloat(priceUsd).toFixed(8)];
        }
      }
      if (_name != `` && _price != ``) {
        responses.push({
          name: _name,
          prices: _price,
        });
      }
    } catch (err) {}
  }
  console.log(JSON.stringify(responses));
};

main(...process.argv.slice(2));

// deno run --allow-net ./src/osmosis_and_oraichainlab.js '["[\"ETH\",\"BTC\",\"OCH\",\"USDT\",\"ORAI\",\"ATOM\",\"STATOM\",\"OSMO\",\"STOSMO\",\"INJ\"]"]'
