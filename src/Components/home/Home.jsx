import { fetchAllCoins } from "../../State/coins/callCoins"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import "./home.css"

const Home = () => {
    const dispatch = useDispatch();

    const allCoins = useSelector(state => state.allCoins.value)

    useEffect(() => {
        dispatch(fetchAllCoins())
    }, [])

    return (
        <div className="allCoinsContainer">
            {allCoins.map(elem =>
                <div key={elem.id} className="individualCoin">
                    <div>
                        <div>{elem.name}</div>
                        <div>{elem.symbol}</div>
                    </div>

                    <div>${elem.priceUsd}</div>

                    <div>{elem.changePercent24Hr}%</div>
                    <div>${elem.marketCapUsd}</div>
                    <div>${elem.volumeUsd24Hr}</div>
                    <div>${elem.supply}</div>

                </div>)}
        </div>
    )
}

export default Home