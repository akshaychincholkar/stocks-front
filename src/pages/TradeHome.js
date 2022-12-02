import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link , useParams} from 'react-router-dom'

export default function TradeHome() {
    const [trades,settrades] = useState([])
    const {id} = useParams();
    useEffect(()=>{
        console.log("Creating Trade App")
        loadtrades();
    },[]
    )
    const  loadtrades=async()=>{
        const result =await axios.get("http://localhost:8080/smms")
        settrades(result.data)
    }

    const deleteTrade = async (id)=>{
        await axios.delete(`http://localhost:8080/smm/${id}`)
        loadtrades()
    }
    return (
        <div className='container'>
            <div className='py-4'>
                <table class="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Script</th>
                            <th scope="col">Close Price</th>
                            <th scope="col">Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            trades.map((trade,index)=>(
                            <tr>
                                <th scope="row" key={index}>
                                    {index+1}</th>
                                <td>{trade.script}</td>
                                <td>{trade.closePrice}</td>
                                <td>{trade.result}</td>
                                <td>
                                    <Link className='btn btn-primary mx-2' to={`/viewtrade/${trade.tradeId}`}>View</Link>
                                    <Link className='btn btn-outline-primary mx-2' to={`/edittrade/${trade.tradeId}`} 
                                    >Edit</Link>
                                    <button className='btn btn-danger mx-2' onClick={()=>deleteTrade(trade.tradeId)}>Delete</button>
                                </td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
