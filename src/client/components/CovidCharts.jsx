import React, { useState, useEffect } from 'react';
import useCustomState from '../context/useCustomState';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip
} from 'recharts';

const CovidCharts = props => {
    const { covidData, loaded } = useCustomState();
    const lineMap = {
        'US': 'blue',
        'China Hubei': 'red',
        'Italy': 'green',
        'Spain': 'darkorange',
        'Iran': 'purple',
        'France': 'grey',
        'Germany': 'pink',
        'Netherlands': 'darkblue',
        'United Kingdom': 'darkgreen',
        'Belgium': 'brown',
        'Switzerland': 'lightblue',
        'Turkey': 'lightgreen'
    }

    const renderLines = (dataframe) => {
        return Object.keys(dataframe).map((country, key) => {
            if (country != 'name') {
                return (
                    <Line
                        type='monotone'
                        dataKey={ country }
                        dot={ false }
                        strokeWidth={3}
                        stroke={ lineMap[country] ? lineMap[country] : 'blue' }
                        key={key}
                    />
                )
            }
        })
    }

    const renderCell = val => {
        if (val === 0) {
            return <p>UNCH</p>
        }
        if (!val) {
            return <p>N/A</p>
        }
        if (val > 0) {
            return <p id='positive'>+{val}</p>
        } else {
            return <p id='negative'>-{val}</p>
        }
    }

    const renderAgg = () => {
        const num = 3;
        if (loaded) {
            let result = {}
            covidData.map((elt, key) => {
                let temp = elt.df.slice(Math.max(elt.df.length - num, 0));
                Object.keys(temp[0]).map((x, k) => {
                    if (x != 'name') {
                        if (!result[x]) {
                            result[x] = { };
                        }
                        result[x][elt.valueName] = temp[num - 1][x] - temp[0][x];
                    }
                })
            })

            return (
                <div className='chart-container'>
                    <h1>Change in last {num} days</h1>
                    <table className='last-x'>
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>Confirmed</th>
                                <th>Recovered</th>
                                <th>Deaths</th>
                            </tr>
                        </thead>
                        <tbody>
                            { Object.keys(result).map((country, key) => {
                                return (
                                    <tr key={key}>
                                        <td style={{color: lineMap[country]}}>{ country }</td>
                                        <td>{ renderCell(result[country]['Confirmed']) }</td>
                                        <td>{ renderCell(result[country]['Recovered']) }</td>
                                        <td>{ renderCell(result[country]['Deaths']) }</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    const renderCovid = () => {
        if (loaded) {
            return covidData.map((elt, key) => {
                return (<div className='chart-container' key={key}>
                    <h1>{ elt.valueName }: <small>range greater than { elt.range }</small></h1>
                    <LineChart
                        width={725}
                        height={400}
                        data={elt.df}
                        margin={{
                           top: 5, right: 30, left: 20, bottom: 5,
                         }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip itemSorter={(item) => (-item.value)} />
                    <Legend />
                    { renderLines(elt.df[0]) }
                    </LineChart>
                </div>)
            })
        } else {
            return <div>Loading....</div>;
        }
    }

    return (
        <div className='covid-container'>
            { renderCovid() }
            { renderAgg() }
        </div>
    )
}

export default CovidCharts;
