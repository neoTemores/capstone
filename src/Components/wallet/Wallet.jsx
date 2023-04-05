import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchAllSavedCoinsByUser, deleteFromWallet } from "../../State/wallet/savedCoins"
import { fetchIndividualCoinData, setAllCoinData } from "../../State/wallet/allCoinData"
import Pagination from "../templates/Pagination"
import { getImg, parseMoneyValue } from "../home/helperMethods"

const Wallet = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allSavedCoins = useSelector(state => state.savedCoins.value)
    const allCoinData = useSelector(state => state.allCoinData.value)
    const currentUser = useSelector(state => state.currentUser.value)
    const loggedIn = useSelector(state => state.loggedIn.value)
    const [startIndex, setStartIndex] = useState(0)
    const [lastIndex, setLastIndex] = useState(10)

    useEffect(() => {
        if (!loggedIn) return redirectToLogin()

        dispatch(fetchAllSavedCoinsByUser(currentUser.id))
    }, [currentUser])

    useEffect(() => {
        if (allSavedCoins?.length > 0)
            getCoinData()
    }, [allSavedCoins?.length])

    const redirectToLogin = () => {
        navigate("/")
        navigate("/login")
    }

    const getCoinData = () => {
        dispatch(setAllCoinData([]))
        allSavedCoins.forEach(elem => {
            dispatch(fetchIndividualCoinData(elem.currencyName))
        })
    }

    const handleRemoveFromWallet = (e) => {
        let id;

        allSavedCoins.forEach(elem => {
            if (elem.currencyName === e.target.dataset.name) {
                id = elem.id
            }
        })

        dispatch(deleteFromWallet(id))
    }
    const updateIndex = (num) => {
        setStartIndex(prev => prev + num)
        setLastIndex(prev => prev + num)
    }

    if (allSavedCoins?.length < 1)
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

            {allCoinData.slice(startIndex, lastIndex).map(elem =>

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
            <Pagination
                startIndex={startIndex}
                lastIndex={lastIndex}
                length={allCoinData.length}
                updateIndex={updateIndex}
                itemsPerPage={10}
            />
        </div>
    )
}

export default Wallet