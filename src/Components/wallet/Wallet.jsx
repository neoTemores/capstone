import { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchAllSavedCoinsByUser } from "../../State/wallet/savedCoins"
import { fetchIndividualCoinData, setAllCoinData } from "../../State/wallet/allCoinData"

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
            console.log(elem)
            dispatch(fetchIndividualCoinData(elem.currencyName))
        })
    }
    const getImg = (symbol) => `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;

    return (
        <div className="walletContainer">Wallet
            {allSavedCoins.length === 0 && <h1>You do not have any saved coins!</h1>}
            {allCoinData.map(elem =>
                <div key={elem.id} className="individualCoin">

                    <div className="imgSymbolCointainer">
                        <img src={getImg(elem.symbol)} height="32" />
                        <div>
                            <div>{elem.name}</div>
                            <div>{elem.symbol}</div>
                        </div>
                    </div>

                    <div>${elem.priceUsd.toFixed(2)}</div>

                    <div style={{ "color": elem.changePercent24Hr < 0 ? "red" : "green" }}>
                        {elem.changePercent24Hr.toFixed(2)}%
                    </div>
                    <div>${elem.marketCapUsd.toFixed(2)}</div>
                    <div>${elem.volumeUsd24Hr.toFixed(2)}</div>
                    <div>${elem.supply.toFixed(2)}</div>

                    <button>Remove from Wallet</button>
                </div>)
            }

        </div>
    )
}

export default Wallet