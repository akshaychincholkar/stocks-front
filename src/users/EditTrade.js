import axios from 'axios';
import React, { useEffect, useInsertionEffect,useState, useRef} from 'react'
import { Link, useActionData, useNavigate,useParams } from 'react-router-dom'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function EditTrade() {
    const {id} = useParams();
    let navigate = useNavigate();
    let currentDate = new Date();
    const [l_tradeDate, setTradeDate] = useState(new Date());

    const [trade, setTrade] = useState({
        "tradeDate": currentDate,
        "script": null,
        "closePrice": 0,
        "doubleScreenDecision": null,
        "candleStickPattern": null,
        "volume": null,
        "ema": "",
        "chartPattern": null,
        "fibRetracement": 0,
        "divergence": false,
        "immediateSupport": 0,
        "immediateResistance": 0,
        "majorSupport": 0,
        "majorResistance": 0,
        "stopLoss": 0,
        "minTargetPrice": 0,
        "maxTargetPrice": 0,
        "minReward": 0,
        "maxReward": 0,
        "risk": 0,
        "minRiskRewardRatio": 0,
        "maxRiskRewardRatio": 0,
        "tradeDecision": null,
        "totalCapital": 0,
        "investmentPerTrade": 0,
        "maxRiskAllowed": 0,
        "maxNoOfSharesAllowed": 0,
        "totalInvestment": 0,
        "noOfShares": 0,
        "riskInvolved": 0,
        "minProfitPotential": 0,
        "maxProfitPotential": 0,
        "minROI": 0,
        "maxROI": 0,
        "minTotalGain": 0,
        "maxTotalGain": 0,
        "worstCaseAmount": 0,
        "actualGain": 0,
        "result": "in_progress"
    })

    const { name,tradeDate,script,closePrice,doubleScreenDecision,candleStickPattern,volume,ema,chartPattern,fibRetracement,divergence,immediateSupport,immediateResistance,majorSupport,majorResistance,stopLoss,minTargetPrice,maxTargetPrice,minReward,maxReward,risk,minRiskRewardRatio,maxRiskRewardRatio,tradeDecision,totalCapital,investmentPerTrade,maxRiskAllowed,maxNoOfSharesAllowed,totalInvestment,noOfShares,riskInvolved,minProfitPotential,maxProfitPotential,minROI,maxROI,minTotalGain,maxTotalGain,worstCaseAmount,actualGain,result } = trade;
    const [showMinimumText, setshowMinimumText] = useState(("<Enter Minimum Support / Resistance>"));
    const [showMaximumText, setshowMaximumText] = useState(("<Enter Maximum Support / Resistance>"));
    const [showMinimumRewardText, setShowMinimumRewardText] = useState(("<Enter Maximum Support / Resistance>"));
    const [showMaximumRewardText, setShowMaximumRewardText] = useState(("<Enter Maximum Support / Resistance>"));
    const [showHideImmediateSupport, setshowHideImmediateSupport] = useState("");
    const [showRiskText,setshowRiskText] = useState("<Enter the Stop Loss>");
    const [showMinrR,setshowMinrR] = useState("<Enter the Stop Loss>");
    const [showMaxrR,setshowMaxrR] = useState("<Enter the Stop Loss>");
    const [showMaxRiskAllowed,setshowMaxRiskAllowed] = useState("<Enter the Trade Capital>");
    const [showNoOfAllowedShares,setshowNoOfAllowedShares] = useState("<Enter the Trade Capital>");
    const [showNumberOfShares,setshowNumberOfShares] = useState("<Enter the Total Investment>");
    const [showRiskInvolved,setshowRiskInvolved] = useState("<Enter the Total Investment>");
    const [showMinProfitPotential,setshowMinProfitPotential] = useState("Enter the Total Investment>");
    const [showMaxProfitPotential,setshowMaxProfitPotential] = useState("Enter the Total Investment>");
    const [showMinROI,setshowMinROI] = useState("<Enter the Total Investment>");
    const [showMaxROI,setshowMaxROI] = useState("<Enter the Total Investment>");
    const [showMinTotalGain,setshowMinTotalGain] = useState("<Enter the Total Investment>");
    const [showMaxTotalGain,setshowMaxTotalGain] = useState("<Enter the Total Investment>");
    const [showWorstCaseAmount,setshowWorstCaseAmount] = useState("<Enter the Total Investment>");

    const onInputChange = (e) => {
        setTrade({ ...trade, [e.target.name]: e.target.value })
    }
    const onInputChangeWithNumericValue = (e) =>{
        setTrade({ ...trade, [e.target.name]: Number(e.target.value) })
    }
    const onCheckBoxChange = (e) => {
        setTrade({ ...trade, [e.target.name]: e.target.checked })
    }
    const onTradeDateSelection=(e)=>{
        // const d = new Date(e).toLocaleDateString('fr-FR');
        setTradeDate(e)
        setTrade({ ...trade, ['tradeDate']: e })
    }
    // immediate resistance
    const onMinimumTargetPrice = (e) => {
        let value = Number(e.target.value);
        let output;
        if(trade.doubleScreenDecision == 'buy'){
            output = value - Number(trade.closePrice);
        }else if(trade.doubleScreenDecision == 'sell'){
            output = Number(trade.closePrice) - value;
        }
        setshowMinimumText(value)
        setShowMinimumRewardText(output)               
        trade.immediateResistance=value;  
        trade.minTargetPrice=value;    
        setTrade({ ...trade,'minReward': output})
    }
    const onMaximumTargetPrice = (e) => {
        let value = Number(e.target.value);
        let maxReward;
        if(trade.doubleScreenDecision == 'buy'){
            maxReward = value - Number(trade.closePrice);
        }else if(trade.doubleScreenDecision == 'sell'){
            maxReward = Number(trade.closePrice) - value;
        }
        setshowMaximumText(value)
        setShowMaximumRewardText(maxReward)
        trade.majorResistance = value;
        trade.maxTargetPrice = value;
        trade.maxReward=maxReward;
        setTrade({ ...trade, [e.target.name]: value })
    }
    const handleShowHide = (e) => {
        setshowHideImmediateSupport(e.target.value);
        setTrade({ ...trade, [e.target.name]: e.target.value })
    }
    const calculateRisk = (e) => {
        let value_l = Number(e.target.value);
        let risk ;
        if(trade.doubleScreenDecision == 'buy'){
            risk = Number(trade.closePrice) - value_l;
        }else if(trade.doubleScreenDecision == 'sell'){
            risk = value_l - Number(trade.closePrice) ;
        }
        let minRr = Number(trade.minReward)/Number(risk);
        let maxRr = Number(trade.maxReward)/Number(risk);
        setshowRiskText(risk)
        setshowMinrR(minRr);
        setshowMaxrR(maxRr);
        trade.risk = risk;
        trade.minRiskRewardRatio = minRr;
        trade.maxRiskRewardRatio = maxRr;
        setTrade({ ...trade, [e.target.name]: value_l })
    }
    const calculateAllowedRisk= (e) =>{
        let maxRiskAllowed_l = Number(e.target.value)*0.02;
        setshowMaxRiskAllowed(maxRiskAllowed_l)
        trade.maxRiskAllowed = maxRiskAllowed_l;
        setTrade({ ...trade, [e.target.name]: Number(e.target.value) })
    }
    const calculateNoOfSharesAllowed=(e) => {
        let maxAllowedShares_l = Number(trade.maxRiskAllowed)/Number(trade.risk);
        setshowNoOfAllowedShares(maxAllowedShares_l)  
        trade.maxNoOfSharesAllowed = maxAllowedShares_l;
        setTrade({ ...trade, [e.target.name]: Number(e.target.value) })
    }
    const calculateInvestments = (e) => { 
        let l_value = Number(e.target.value);
        let noOfShares= l_value/Number(trade.closePrice);
        setshowNumberOfShares(noOfShares)
        let riskInvolved = noOfShares*Number(trade.risk);
        setshowRiskInvolved(riskInvolved)
        let minProfitPotential= noOfShares*Number(trade.minReward);
        let maxProfitPotential= noOfShares*Number(trade.maxReward);
        let minROI_l = (minProfitPotential/l_value)*100;
        let maxROI_l = (maxProfitPotential/l_value)*100;
        let minTotalGain_l = Number(minProfitPotential)+l_value;
        let maxTotalGain_l = Number(maxProfitPotential)+l_value;
        let worstCaseAmount_l = l_value - Number(riskInvolved);
        setshowMinProfitPotential(minProfitPotential)
        setshowMaxProfitPotential(maxProfitPotential)
        setshowMinROI(minROI_l)
        setshowMaxROI(maxROI_l)
        setshowMinTotalGain(minTotalGain_l)
        setshowMaxTotalGain(maxTotalGain_l)
        setshowWorstCaseAmount(worstCaseAmount_l)
        trade.noOfShares = noOfShares;
        trade.riskInvolved = riskInvolved;
        trade.minProfitPotential = minProfitPotential;
        trade.maxProfitPotential = maxProfitPotential;
        trade.minROI = minROI_l;
        trade.maxROI = maxROI_l;
        trade.minTotalGain = minTotalGain_l;
        trade.maxTotalGain = maxTotalGain_l;
        trade.worstCaseAmount = worstCaseAmount_l;
        setTrade({ ...trade, [e.target.name]: l_value })
    }

    useEffect(()=>{
        loadTrade()
    },[]);
    const onSubmit=async(e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8080/smm/${id}`,trade)
        navigate("/trade")
    };

    const loadTrade = async () =>{
        const result = await axios.get(`http://localhost:8080/smm/${id}`)
        setTrade(result.data);
    }
    const inputRef = useRef(null);

    function handleClick() {
      console.log(inputRef.current.value);
    }
    return (

        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Register Trade</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <form>
                        <div>
                            <label>
                                Script Date:
                                <DatePicker dateFormat="dd/MM/yyyy" selected={l_tradeDate} def onCalendarOpen={(date) => onTradeDateSelection(date)} />
                            </label>
                            <br></br>
                            <label>
                                Script/Stock:
                                <input name='script' value={script} onChange={(e) => onInputChange(e)} />
                            </label>
                            <br></br>
                            <label>
                                Close Price:
                                <input name='closePrice' value={closePrice} onChange={(e) => onInputChangeWithNumericValue(e)} />
                            </label>
                            <br></br>
                            <label>
                                Double Screen Decision:
                                <select name='doubleScreenDecision' onChange={(e) => handleShowHide(e)} value={doubleScreenDecision}>
                                    <option value={"0"}>----</option>
                                    <option value={"buy"}>Buy</option>
                                    <option value={"sell"}>Sell</option>
                                </select>
                            </label>
                            <br></br>
                            <label>
                                Candlestick Pattern:
                                <select name='candleStickPattern' onChange={(e) => onInputChange(e)} value={trade.candleStickPattern}>
                                    <option value={"0"}>----------</option>
                                    <option value={"bullish"}>Bullish Green</option>
                                    <option value={"bullish_piercing_or_engulf"}>Bullish Piercing or Engulf</option>
                                    <option value={"hammer"}>Hammer</option>
                                    <option value={"morning_star"}>Morning Star</option>
                                    <option value={"bearish"}>Bearish Red</option>
                                    <option value={"bearish_piercing_or_engulf"}>Bearish Piercing or Engulf</option>
                                    <option value={"inverted_hammer"}>Inverted Hammer</option>
                                    <option value={"evening_star"}>Evening Star</option>
                                    <option value={"hanging_man"}>Hanging Man</option>
                                </select>
                            </label>
                            <br></br>
                            <label>
                                Volume:
                                <select name='volume' onChange={(e) => onInputChange(e)} value={volume}>
                                    <option value={"0"}>----------</option>
                                    <option value={"high"}>High (Strong Bullish)</option>
                                    <option value={"moderate"}>Moderate</option>
                                    <option value={"low"}>Low</option>
                                </select>
                            </label>
                            <br></br>
                            <label>
                                EMA:
                                <select name='ema' onChange={(e) => onInputChange(e)} value={ema}>
                                    <option value={"0"}>----------</option>
                                    <option value={"bullish"}>5&gt;13&gt;26</option>
                                    <option value={"bearish"}>5&lt;13&lt;26</option>
                                    <option value={"other"}>Not Matching</option>
                                </select>
                            </label>
                            <br></br>
                            <label>
                                Chart Pattern:
                                <select name='chartPattern' onChange={(e) => onInputChange(e)} value={trade.chartPattern}>
                                    <option value={"0"}>----------</option>
                                    <option value={"inverted_h_and_s"}>Inverted Head & Shoulder</option>
                                    <option value={"double_bottom"}>Double Bottom </option>
                                    <option value={"rounding_bottom"}>Rounding Bottom/Cup with Handle </option>
                                    <option value={"flag_breakout"}>Breakout of Flag</option>
                                    <option value={"fake_breakdown"}>Fake Breakdown</option>
                                    <option value={"bearish_piercing_or_engulf"}>Bearish Piercing or Engulf</option>
                                    <option value={"h_and_s"}>Head and Shoulder</option>
                                    <option value={"double_top"}>Double Top</option>
                                    <option value={"rounding_top"}>Rounding Top</option>
                                    <option value={"flag_breakdown"}>Breakdown of a Flag</option>
                                    <option value={"fake_breakout"}>Fake Breakout</option>
                                </select>
                            </label>
                            <br></br>
                            <label>
                                Fibonacci Retracement:
                                <select name='fibRetracement' onChange={(e) => onInputChange(e)} value={fibRetracement}>
                                    <option value={"0"}>----------</option>
                                    <option value={"23.6"}>23.6%</option>
                                    <option value={"38.2"}>38.2%</option>
                                    <option value={"61.8"}>61.8%</option>
                                    <option value={"78.6"}>78.6%</option>
                                </select>
                            </label>
                            <br></br>
                            <label>
                                Divergence:
                                <input type="checkbox" name='divergence' checked={divergence} onChange={(e) => onCheckBoxChange(e)} />
                            </label>
                            {
                                ((showHideImmediateSupport == "buy" || trade.doubleScreenDecision == "buy") &&
                                    <div >
                                        <label>
                                            Immediate Resistance:
                                            <input name='immediateResistance' value={trade.immediateResistance} onChange={(e) => onMinimumTargetPrice(e)} />
                                        </label>

                                        <br></br>
                                        <label>
                                            Major Resistance:
                                            <input name='majorResistance' value={trade.majorResistance} onChange={(e) => onMaximumTargetPrice(e)} />
                                        </label>
                                    </div>
                                )
                            }
                            {
                                (showHideImmediateSupport == "sell" || trade.doubleScreenDecision == "sell") && (
                                    <div>
                                        <label>
                                            Immediate Support:
                                            <input name='immediateSupport' value={trade.immediateSupport} onChange={(e) => onMinimumTargetPrice(e)} />
                                        </label>
                                        <br></br>
                                        <label>
                                            Major Support:
                                            <input name='majorSupport' value={trade.majorSupport} onChange={(e) => onMaximumTargetPrice(e)} />
                                        </label>
                                    </div>
                                )
                            }
                            <br></br>
                            <label>
                                Stop Loss
                                <input name='stopLoss' value={trade.stopLoss} onChange={(e) => calculateRisk(e)} />
                            </label>
                            <br></br>
                            <label  name='minTargetPrice' ref={inputRef} value={showMinimumText} onChange={(e)=>onInputChange(e)}>
                                Minimum Target Price: 
                                <input name='minTargetPrice' value={trade.minTargetPrice} onChange={(e)=>onInputChange(e)} defaultValue={minTargetPrice}/>
                            </label>
                            <br></br>
                            <label>
                                Maximum Target Price: 
                                <input name='maxTargetPrice' value={trade.maxTargetPrice} onChange={(e)=>onInputChange(e)} />
                            </label>
                            <br></br>
                            <label>
                                Minimum Reward: {trade.minReward}
                                {/* <input name='minReward' value={name} onChange={(e)=>calculateMinReward(e)} /> */}
                            </label>
                            <br></br>
                            <label>
                                Maximum Reward: {trade.maxReward}
                                {/* <input name='maxReward' value={name} onChange={(e) => onInputChange(e)} /> */}
                            </label>
                            <br></br>
                            <label>
                                Risk: {trade.risk}
                                {/* <input name='risk' value={name} onChange={(e) => onInputChange(e)} /> */}
                            </label>
                            <br></br>
                            <label>
                                Minimum r:R : {trade.minRiskRewardRatio}
                                {/* <input name='minRiskRewardRatio' value={name} onChange={(e) => onInputChange(e)} /> */}
                            </label>
                            <br></br>
                            <label>
                                Maximum r:R : {trade.maxRiskRewardRatio}
                                {/* <input name='maxRiskRewardRatio' value={name} onChange={(e) => onInputChange(e)} /> */}
                            </label>
                            <br></br>
                            <label>
                                Trade Decision:
                                <select name='tradeDecision' onChange={(e) => onInputChange(e)}>
                                    <option value={"0"}>----------</option>
                                    <option value={"buy"}>Buy</option>
                                    <option value={"strong_buy"}>Strong Buy</option>
                                    <option value={"sell"}>Sell</option>
                                    <option value={"strong_sell"}>Strong Sell</option>
                                </select>
                            </label>
                            <br></br>
                            <label>Total Capital
                                <input name='totalCapital' value={trade.totalCapital} onChange={(e) => calculateAllowedRisk(e)} />
                            </label>
                            <br></br>
                            <label>Investment Per Trade
                                <input name='investmentPerTrade' value={trade.investmentPerTrade} onChange={(e) => calculateNoOfSharesAllowed(e)} />
                            </label>
                            <br></br>
                            <label>Max. Allowed Risk / Trade of total Capital (2%): {trade.maxRiskAllowed}
                                {/* <input name='maxRiskAllowed' value={name} onChange={(e) => calculateAllowedRisk(e)} /> */}
                            </label>
                            <br></br>
                            <label>
                                Max no. of shared Allowed: {trade.maxNoOfSharesAllowed}
                                {/* <input name='maxNoOfSharesAllowed' value={name} onChange={(e) => onInputChange(e)} /> */}
                            </label>
                            <br></br>
                            <label>Total Investment
                                <input name='totalInvestment' value={trade.totalInvestment} onChange={(e) => calculateInvestments(e)} />
                            </label>
                            <br></br>
                            <label>No of Shares: {trade.noOfShares}
                                {/* <input name='noOfShares' value={name} onChange={(e) => onInputChange(e)} /> */}
                            </label>
                            <br></br>
                            <label>Risk Involved: {trade.riskInvolved}
                                {/* <input name='riskInvolved' value={name} onChange={(e) => onInputChange(e)} /> */}
                            </label>
                            <br></br>
                            <label>Min Profit Potential: {trade.minProfitPotential}
                                {/* <input name='minProfitPotential' value={name} onChange={(e) => onInputChange(e)} /> */}
                            </label>
                            <br></br>
                            <label>Max Profit Potential: {trade.maxProfitPotential}
                                {/* <input name='maxProfitPotential' value={name} onChange={(e) => onInputChange(e)} /> */}
                            </label>
                            <br></br>
                            <label>Min ROI: {trade.minROI}
                                {/* <input name='minROI' value={name} onChange={(e) => onInputChange(e)} /> */}
                            </label>
                            <br></br>
                            <label>Max ROI: {trade.maxROI}
                                {/* <input name='maxROI' value={name} onChange={(e) => onInputChange(e)} /> */}
                            </label>
                            <br></br>
                            <label>Min Total Gain: {trade.minTotalGain}
                                {/* <input name='minTotalGain' value={name} onChange={(e) => onInputChange(e)} /> */}
                            </label>
                            <br></br>
                            <label>Max Total Gain: {trade.maxTotalGain}
                                {/* <input name='maxTotalGain' value={name} onChange={(e) => onInputChange(e)} /> */}
                            </label>
                            <br></br>
                            <label>Worst Case Amount: {trade.worstCaseAmount}
                                {/* <input name='worstCaseAmount' value={name} onChange={(e) => onInputChange(e)} /> */}
                            </label>
                            <br></br>
                            <label>Actual Gain
                                <input name='actualGain' value={name} onChange={(e) => onInputChangeWithNumericValue(e)} />
                            </label>
                            <br></br>
                            <label>
                                Result:
                                <select name='result' onChange={(e) => onInputChange(e)}>
                                    <option value={"in_progress"}>In Progress</option>
                                    <option value={"success"}>Successful</option>
                                    <option value={"fail"}>Failed</option>
                                </select>
                            </label>
                            
                                <button onClick={handleClick}>Submit</button>
                            </div>
                        </form>
                        <button type='submit' className='btn btn-outline-primary'>Submit  </button>
                        <Link className='btn btn-outline-danger mx-3' to='/trade' >
                            Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
