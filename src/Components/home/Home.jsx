import { fetchAllCoins } from "../../State/coins/allCoins"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addCoinToWallet } from "../../State/wallet/savedCoins"
import "./home.css"

const Home = () => {
    const dispatch = useDispatch();

    const allCoins = useSelector(state => state.allCoins.value)

    useEffect(() => {
        dispatch(fetchAllCoins())
    }, [])
    const getImg = (symbol) => `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;

    const handleAddToWallet = (e) => {
        let coin = {
            userId: 1,
            currencyName: e.target.dataset.name
        }
        dispatch(addCoinToWallet(coin))
    }
    return (
        <div className="allCoinsContainer">
            <div className="individualCoin">
                <div>Currency</div>
                <div>Price</div>
                <div>Chart</div>
                <div>Change</div>
                <div>Market cap</div>
                <div>Volume(24hr)</div>
                <div>Supply</div>
            </div>
            {allCoins.map(elem =>
                <div key={elem.id} className="individualCoin">

                    <div className="imgSymbolCointainer">
                        <img src={getImg(elem.symbol)} height="32" />
                        <div>
                            <div>{elem.name}</div>
                            <div>{elem.symbol}</div>
                        </div>
                    </div>

                    <div>${elem.priceUsd.toFixed(2)}</div>

                    <div style={{ "color": elem.changePercent24Hr < 0 ? "red" : "green" }}>{elem.changePercent24Hr.toFixed(2)}%</div>
                    <div>${elem.marketCapUsd.toFixed(2)}</div>
                    <div>${elem.volumeUsd24Hr.toFixed(2)}</div>
                    <div>${elem.supply.toFixed(2)}</div>

                    <button data-name={elem.id} onClick={handleAddToWallet}>Add to Wallet</button>
                </div>)
            }
        </div>
    )
}

export default Home