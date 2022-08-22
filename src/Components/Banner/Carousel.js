import axios from "axios";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "../../Config/api";
import AliceCarousel from "react-alice-carousel";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);

  const { currency, symbol } = CryptoState();

  const navigate = useNavigate();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  // console.log(trending);

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <div
        className="carouselItem"
        onClick={() => {
          navigate(`/coin/${coin.id}`);
        }}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <Tooltip
            title={profit > 0 ? "Profit" : "Loss"}
            placement="top"
            arrow
            color="primary"
          >
            <span
              style={{
                color: profit > 0 ? "rgb(14,203,129)" : "red",
                fontWeight: 500,
              }}
            >
              {profit && "+"}
              {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </Tooltip>
        </span>
        <span style={{ fontSize: 20, fontWeight: 500 }}>
          {symbol}
          {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </div>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className="carousel">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        disableButtonsControls
        items={items}
      ></AliceCarousel>
    </div>
  );
};

export default Carousel;
