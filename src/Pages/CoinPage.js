import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../Config/api";
import CoinInfo from "../Components/CoinInfo";
import { LinearProgress, Typography } from "@mui/material";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  console.log(coin);

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className="container">
      <div className="sidebar">
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="250"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3"
          style={{
            fontFamily: "Montserrat",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
          className="heading"
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            fontFamily: "Montserrat",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
          className="heading"
        ></Typography>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
