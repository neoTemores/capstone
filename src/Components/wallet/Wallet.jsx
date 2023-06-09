import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchAllSavedCoinsByUser, deleteFromWallet } from "../../State/wallet/savedCoins"
import { fetchIndividualCoinData, setAllCoinData, sortCoinDataBy } from "../../State/wallet/allCoinData"
import { fetchUserProfile } from "../../State/profile/userProfile"
import Pagination from "../templates/Pagination"
import { getImg, parseMoneyValue } from "../home/helperMethods"
import { showAll, hideAll, showSpecific } from "../forum/helperMethods"
import { setLoading } from "../../State/loading"
import { BsTrash, BsFilter } from "react-icons/bs"
import { BiSortAlt2 } from "react-icons/bi"
// import { CgSortZa } from "react-icons/cg"
import "./wallet.css"


const Wallet = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allSavedCoins = useSelector(state => state.savedCoins.value)
    const allCoinData = useSelector(state => state.allCoinData.value)
    const currentUser = useSelector(state => state.currentUser.value)
    const loggedIn = useSelector(state => state.loggedIn.value)
    let index = 8
    const [startIndex, setStartIndex] = useState(0)
    const [lastIndex, setLastIndex] = useState(index)
    const sortedBy = useRef(null)
    const sortReversed = useRef(false)

    useEffect(() => {
        if (!loggedIn && localStorage.getItem('cryptoEagleUser') === null)
            return redirectToLogin()

        if (currentUser.id) {
            dispatch(setLoading(true))
            Promise.resolve(dispatch(fetchAllSavedCoinsByUser(currentUser.id)))
                .then(() => dispatch(setLoading(false)))
        }
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

        dispatch(setLoading(true))
        allSavedCoins.forEach(elem => {
            if (elem.currencyName === e.currentTarget.dataset.name) {
                id = elem.id
            }
        })

        Promise.resolve(dispatch(deleteFromWallet(id)))
            .then(() => {
                dispatch(fetchUserProfile(currentUser.username))
                dispatch(setLoading(false))
            })
    }
    const updateIndex = (num) => {
        setStartIndex(prev => prev + num)
        setLastIndex(prev => prev + num)
    }

    const updateIcon = (e, col) => {

        if (col !== sortedBy.current) {
            hideAll(".sortIcon")
            showAll(".unsortedIcon")
            e.currentTarget.classList.add("hide")
            document.querySelectorAll(".sortIcon").forEach(elem => elem.classList.add("rotate180"))
            showSpecific(".sortIcon", col)
        } else {
            e.currentTarget.classList.toggle("rotate180")
        }
    }

    const handleSort = (e, col) => {
        updateIcon(e, col)

        const sortObj = {
            col: col,
            reverse: sortReversed.current
        }

        if (sortedBy.current === col) {
            sortObj.reverse = !sortObj.reverse
            sortReversed.current = !sortReversed.current
        } else {
            sortedBy.current = col
            sortReversed.current = false
            sortObj.reverse = false
        }

        dispatch(sortCoinDataBy(sortObj))
    }

    if (allSavedCoins?.length < 1)
        return (
            <div className="allCoinsContainer">
                <h1 style={{ color: "navy" }}>You do not have any saved coins!</h1>
            </div>)

    return (
        <div className="allCoinsContainer">

            <div className="coinGridHeaderContainer wallet">
                <div className="gridHeader">
                    Currency
                    <BiSortAlt2 className="unsortedIcon"
                        onClick={(e) => handleSort(e, "id")} />
                    <BsFilter
                        data-id="id"
                        onClick={(e) => handleSort(e, "id")}
                        className="sortIcon hide rotate180" />
                </div>
                <div className="gridHeader">
                    Price
                    <BiSortAlt2 className="unsortedIcon"
                        onClick={(e) => handleSort(e, "priceUsd")} />
                    <BsFilter
                        data-id="priceUsd"
                        onClick={(e) => handleSort(e, "priceUsd")}
                        className="sortIcon hide rotate180" />
                </div>
                <div className="gridHeader">
                    Change
                    <BiSortAlt2 className="unsortedIcon"
                        onClick={(e) => handleSort(e, "changePercent24Hr")} />
                    <BsFilter
                        data-id="changePercent24Hr"
                        onClick={(e) => handleSort(e, "changePercent24Hr")}
                        className="sortIcon hide rotate180" />
                </div>
                <div className="gridHeader marketCap">
                    Market cap
                    <BiSortAlt2 className="unsortedIcon"
                        onClick={(e) => handleSort(e, "marketCapUsd")} />
                    <BsFilter
                        data-id="marketCapUsd"
                        onClick={(e) => handleSort(e, "marketCapUsd")}
                        className="sortIcon hide rotate180" />
                </div>
                <div className="gridHeader volume">
                    Volume(24hr)
                    <BiSortAlt2 className="unsortedIcon"
                        onClick={(e) => handleSort(e, "volumeUsd24Hr")} />
                    <BsFilter
                        data-id="volumeUsd24Hr"
                        onClick={(e) => handleSort(e, "volumeUsd24Hr")}
                        className="sortIcon hide rotate180" />
                </div>
                <div className="gridHeader supply">
                    Supply
                    <BiSortAlt2 className="unsortedIcon"
                        onClick={(e) => handleSort(e, "supply")} />
                    <BsFilter
                        data-id="supply"
                        onClick={(e) => handleSort(e, "supply")}
                        className="sortIcon hide rotate180" />
                </div>
                <div className="gridHeader">Remove</div>
            </div>

            {allCoinData.slice(startIndex, lastIndex).map(elem =>

                <div className="individualCoinContainer" key={elem.id}>

                    <div className="imgSymbolCointainer">
                        <img src={getImg(elem.symbol)} height="48" />
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
                    <div className="marketCap">${parseMoneyValue(elem.marketCapUsd)}</div>
                    <div className="volume">${parseMoneyValue(elem.volumeUsd24Hr)}</div>
                    <div className="supply">${parseMoneyValue(elem.supply)}</div>

                    <BsTrash
                        data-name={elem.id}
                        onClick={handleRemoveFromWallet}
                        className="deleteCoinFromWalletBtn"
                        style={{ "color": "red", "fontSize": "1.5rem" }} />

                </div>
            )}
            <Pagination
                startIndex={startIndex}
                lastIndex={lastIndex}
                length={allCoinData.length}
                updateIndex={updateIndex}
                itemsPerPage={index}
            />
        </div>
    )
}

export default Wallet