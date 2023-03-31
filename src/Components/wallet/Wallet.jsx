import { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchAllSavedCoinsByUser, deleteFromWallet } from "../../State/wallet/savedCoins"
import { fetchIndividualCoinData, setAllCoinData } from "../../State/wallet/allCoinData"
import { parseMoneyValue } from "../home/Home"

const Wallet = () => {
    const dispatch = useDispatch()
    const allSavedCoins = useSelector(state => state.savedCoins.value)
    const allCoinData = useSelector(state => state.allCoinData.value)

    useEffect(() => {
        dispatch(fetchAllSavedCoinsByUser(1))
    }, [])

    useEffect(() => {
        if (allSavedCoins.length > 0)
            getCoinData()
    }, [allSavedCoins.length])

    const getCoinData = () => {
        dispatch(setAllCoinData([]))
        allSavedCoins.forEach(elem => {
            dispatch(fetchIndividualCoinData(elem.currencyName))
        })
    }
    const getImg = (symbol) => `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;

    const handleRemoveFromWallet = (e) => {
        let id;
        allSavedCoins.forEach(elem => {
            if (elem.currencyName === e.target.dataset.name)
                id = elem.id
        })
        dispatch(deleteFromWallet(id))
    }

    if (allSavedCoins.length < 1)
        return <h1>You do not have any saved coins!</h1>

    return (
        <div className="allCoinsContainer">

            <div className="coinGridHeaderContainer">
                <div className="gridHeader">Currency</div>
                <div className="gridHeader">Price</div>
                <div className="gridHeader">Change</div>
                <div className="gridHeader">Market cap</div>
                <div className="gridHeader">Volume(24hr)</div>
                <div className="gridHeader">Supply</div>
                <div className="gridHeader">Watching</div>
            </div>

            {allCoinData.map(elem =>

                <div className="individualCoinContainer" key={elem.id}>

                    <div className="imgSymbolCointainer">
                        <img src={getImg(elem.symbol)} height="32" />
                        <div>
                            <div>{elem.name}</div>
                            <div className="symbol">{elem.symbol}</div>
                        </div>
                    </div>

                    <div>${elem.priceUsd.toFixed(2)}</div>

                    <div
                        style={{ "color": elem.changePercent24Hr < 0 ? "red" : "green" }}>
                        {elem.changePercent24Hr.toFixed(2)}%
                    </div>
                    <div>${parseMoneyValue(elem.marketCapUsd)}</div>
                    <div>${parseMoneyValue(elem.volumeUsd24Hr)}</div>
                    <div>${parseMoneyValue(elem.supply)}</div>

                    <button data-name={elem.id} onClick={handleRemoveFromWallet}>Remove from Wallet</button>

                </div>
            )}

        </div>
    )
}

export default Wallet