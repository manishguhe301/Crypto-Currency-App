import {
  CircularProgress,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "../Components/CoinsTable";
import ReactHtmlParser from "@orrisroot/react-html-parser";

const CoinInfo = ({ coin }) => {
  const { currency, symbol } = CryptoState();
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      {!coin ? (
        <div
          className="container_chart"
          style={{
            width: "75%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            padding: 40,
          }}
        >
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        </div>
      ) : (
        <div className="marketData">
          <Typography
            variant="h6"
            style={{
              marginLeft: "10px",
              fontFamily: "Montserrat",
              marginBottom: "20px",
              fontWeight: "bold",
              // textAlign:'justify'
            }}
          >
            {ReactHtmlParser(coin?.description.en.split(". ")[0])}
          </Typography>
          <span style={{ display: "flex", marginLeft: 10 }}>
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
                marginBottom: "20px",
                fontWeight: "bold",
              }}
            >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h6" style={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex", marginLeft: 10 }}>
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
                marginBottom: "20px",
                fontWeight: "bold",
              }}
            >
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h6" style={{ fontFamily: "Montserrat" }}>
              {symbol + " "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex", marginLeft: 10 }}>
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
                marginBottom: "20px",
                fontWeight: "bold",
              }}
            >
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h6" style={{ fontFamily: "Montserrat" }}>
              {symbol + " "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          <span style={{ display: "flex", marginLeft: 10 }}>
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
                marginBottom: "20px",
                fontWeight: "bold",
              }}
            >
              24H Change:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
                color:
                  coin.market_data.price_change_percentage_24h > 0
                    ? "rgb(14, 203, 129)"
                    : "red",
              }}
            >
              {coin.market_data.price_change_percentage_24h
                .toString()
                .slice(0, 4)}
              %
            </Typography>
          </span>
        </div>
      )}
    </ThemeProvider>
  );
};

export default CoinInfo;
