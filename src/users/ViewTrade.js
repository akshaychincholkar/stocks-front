import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewTrade() {
    const {id} = useParams();

    const [trade, setTrade] = useState({
        "tradeDate": "",
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
    useEffect(()=>{
        loadTrade();
    },[]);

    const loadTrade = async() =>{
        const result = await axios.get(`http://localhost:8080/smm/${id}`);
        setTrade(result.data);
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h1 className='text-center m-4'>Trade Details</h1>
                    <div className='card'>
                        <div className='card-header'>
                           <h3> Details of Trade id: {id}</h3>
                            <ul className='list-group list-group-flush'>
                                <li className="list-group-item">
                                    <b>Name:</b>
                                     {trade.script}
                                </li>
                                <li className="list-group-item">
                                    <b>Date:</b>
                                     {trade.tradeDate}
                                </li>
                                <li className="list-group-item">
                                    <b>Close Price:</b>
                                     {trade.closePrice}
                                </li>
                                <li className="list-group-item">
                                    <b>Double Screen Decision:</b>
                                     {trade.doubleScreenDecision}
                                </li>
                                <li className="list-group-item">
                                    <b>Candlestick Pattern:</b>
                                     {trade.candleStickPattern}
                                </li>
                                <li className="list-group-item">
                                    <b>Volume:</b>
                                     {trade.volume}
                                </li>
                                <li className="list-group-item">
                                    <b>EMA:</b>
                                     {trade.ema}
                                </li>
                                <li className="list-group-item">
                                    <b>Chart Pattern:</b>
                                     {trade.chartPattern}
                                </li>
                                <li className="list-group-item">
                                    <b>Fibonacci Retracement:</b>
                                     {trade.fibRetracement}
                                </li>
                                <li className="list-group-item">
                                    <b>Divergence:</b>
                                     {trade.divergence+''}
                                </li>
                                {
                                    ((trade.doubleScreenDecision == "buy") &&
                                        <div>
                                        <li className="list-group-item">
                                            <b>Immediate Resistance:</b>
                                            {trade.immediateResistance}
                                        </li>
                                        <li className="list-group-item">
                                            <b>Major Resistance:</b>
                                            {trade.majorResistance}
                                        </li>
                                        </div>
                                ) 
                            } 
                            {
                                    ((trade.doubleScreenDecision == "sell") &&
                                        <div>
                                        <li className="list-group-item">
                                            <b>Immediate Support:</b>
                                            {trade.immediateSupport}
                                        </li>
                                        <li className="list-group-item">
                                            <b>Major Support:</b>
                                            {trade.majorSupport}
                                        </li>
                                        </div>
                                ) 
                            }
                                <li className="list-group-item">
                                    <b>Stop Loss:</b>
                                     {trade.stopLoss}
                                </li>
                                <li className="list-group-item">
                                    <b>Minimum Target Price:</b>
                                     {trade.minTargetPrice}
                                </li>
                                <li className="list-group-item">
                                    <b>Maximum Target Price:</b>
                                     {trade.maxTargetPrice}
                                </li>
                                <li className="list-group-item">
                                    <b>Minimum Reward:</b>
                                     {trade.minReward}
                                </li>
                                <li className="list-group-item">
                                    <b>Maximum Reward:</b>
                                     {trade.maxReward}
                                </li>
                                <li className="list-group-item">
                                    <b>Risk:</b>
                                     {trade.risk}
                                </li>
                                <li className="list-group-item">
                                    <b>Minimum r:R :</b>
                                     {trade.minRiskRewardRatio}
                                </li>
                                <li className="list-group-item">
                                    <b>Maximum r:R :</b>
                                     {trade.maxRiskRewardRatio}
                                </li>
                                <li className="list-group-item">
                                    <b>Trade Decision:</b>
                                     {trade.tradeDecision}
                                </li>
                                <li className="list-group-item">
                                    <b>Total Capital:</b>
                                     {trade.totalCapital}
                                </li>
                                <li className="list-group-item">
                                    <b>Investment Per Trade:</b>
                                     {trade.investmentPerTrade}
                                </li>
                                <li className="list-group-item">
                                    <b>Max. Allowed Risk / Trade of total Capital (2%):</b>
                                     {trade.maxRiskAllowed}
                                </li>
                                <li className="list-group-item">
                                    <b>Max no. of shared Allowed:</b>
                                     {trade.maxNoOfSharesAllowed}
                                </li>
                                <li className="list-group-item">
                                    <b>No of Shares :</b>
                                     {trade.noOfShares}
                                </li>
                                <li className="list-group-item">
                                    <b>Risk Involved:</b>
                                     {trade.riskInvolved}
                                </li>
                                <li className="list-group-item">
                                    <b>Minimum Profit Potential:</b>
                                     {trade.minProfitPotential}
                                </li>
                                <li className="list-group-item">
                                    <b>Maximum Profit Potential:</b>
                                     {trade.maxProfitPotential}
                                </li>
                                <li className="list-group-item">
                                    <b>Min ROI:</b>
                                     {trade.minROI}
                                </li>
                                <li className="list-group-item">
                                    <b>Max ROI :</b>
                                     {trade.maxROI}
                                </li>
                                <li className="list-group-item">
                                    <b>Minimum Total Gain:</b>
                                     {trade.minTotalGain}
                                </li>
                                <li className="list-group-item">
                                    <b>Maximum Total Gain:</b>
                                     {trade.maxTotalGain}
                                </li>
                                <li className="list-group-item">
                                    <b>Worst Case Amount:</b>
                                     {trade.worstCaseAmount}
                                </li>
                                <li className="list-group-item">
                                    <b>Actual Gain:</b>
                                     {trade.actualGain}
                                </li>
                                <li className="list-group-item">
                                    <b>Result:</b>
                                     {trade.result}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to={"/trade"}>Back to Home</Link>
                </div>
            </div>
        </div>
    )
}
