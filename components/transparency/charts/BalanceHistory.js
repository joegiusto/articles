import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import Chart from 'chart.js';

class BalanceHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartID: 'balance-history-data-chart',
      revenues: [],
      expenses: [],
      chart: null
    };

    //  this.setChartPeriodSelector = this.setChartPeriodSelector.bind(this);
  }

  // chart = React.createRef();

  componentDidMount() {
    const self = this;

    var daysToCount = 2 * 12 * 30;
    // var months = [];
    var labels = [];
    var values = [];

    for (let i = daysToCount; i > 0; i--) {
      labels.push( moment().subtract(i, 'days').format("MMM DD YY") )
    }

    // for (let i = 0; i < daysToCount; i++) {
    //   values.push( Math.floor(Math.random() * 200) + 1 )
    // }

    axios.get('/api/transparency/charts/balanceHistory', {
      params: {
        // user_id: self.props.user_id || ''
      }
    })
    .then(function (response) {
      console.log("balance-history")
      console.log(response);

      self.setState({
        expenses: response.data.expenses,
        revenues: response.data.revenues
      })

      let runningTotal = 0;

      for (let i = daysToCount; i > 0; i--) {

        console.log(`${i} days ago`)

        let expense_obj = self.state.expenses.find( expense =>  moment(expense._id.date).isSame( moment().subtract(i, 'days'), 'day' ) );
        let revenue_obj = self.state.revenues.find( revenue =>  moment(revenue._id.date).isSame( moment().subtract(i, 'days'), 'day' ) );

        // valueToPush = 0;

        if (revenue_obj === undefined) {
          // values.push( runningTotal )
        } else {
          console.log(`A revenue was spotted on ${revenue_obj._id.date}`)
          runningTotal = (runningTotal + (revenue_obj.total / 100))
          // values.push( runningTotal )
        }

        if (expense_obj === undefined) {
          // values.push( runningTotal )
        } else {
          runningTotal = (runningTotal - (expense_obj.total / 100))
          // values.push( runningTotal )
        }

        values.push( runningTotal );
        // valueToPush = 0;
  
      }

      console.log(values)

      let theChart = new Chart( document.getElementById( self.state.chartID ), {
        type: 'line',
        data: {
            labels: [ 
                ...labels .filter(function (value, index, ar) {
                    return (index % 20 == 0);
                } )
            ],
            datasets: [
                {
                    label: 'Balance',
                    data: [
                        ...values.filter(function (value, index, ar) {
                            return (index % 20 == 0);
                        } )
                    ],
                    backgroundColor: [
                        'rgba(124, 181, 236, 0.25)'
                    ],
                    borderColor: [
                        'rgba(124, 181, 236, 1)'
                    ],
                    pointBackgroundColor: 'rgba(124, 181, 236, 0.25)',
                    pointBorderColor: 'rgba(124, 181, 236, 1)',
                    borderWidth: 0.25,
                    // lineTension: 1,
                },
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        fontFamily: "brandon-grotesque",
                        beginAtZero: true,
                        callback: function (value, index, values) {
        
                        if (value % 1 === 0) {
        
                            if (parseInt(value) >= 1000) {
                            return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            } else {
                            return '$' + value;
                            }
        
                        }
        
                        }
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        fontFamily: "brandon-grotesque",
                        // maxTicksLimit: 20
                    }
                }]
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItems, data) {
                        return '$' + tooltipItems.yLabel.toFixed(2);
                    }
                }
            },
        }
      });

      self.setState({ chart: theChart })

      // for (let i = 0; i < daysToCount; i++) {
      //   console.log( moment().subtract(i, 'days') );
      // }

      // console.log(self.state.expenses.map((expense) => {
      //   console.log( moment(expense._id.date) );
      // }))

    })
    .catch(function (error) {
      console.log(error);
    });

  }

  componentWillUnmount() {

  }

  render(props) {
    return (
        <div>

            <div>
                <button className="btn btn-articles-light btn-sm">1 Months</button>
                <button className="btn btn-articles-light btn-sm">6 Months</button>
                <button className="btn btn-articles-light btn-sm">1 Year</button>
                <button className="btn btn-articles-light btn-sm active">2 Year</button>
            </div>

            <div className="chart balance-history-data-chart ">
                <canvas className='bg-white' id={this.state.chartID} ref={this.chart} width="100%"></canvas>
            </div>
    
            {/* <button className="btn btn-articles-light mt-3" onClick={ () => this.state.chart.destroy() } >DESTROY</button> */}

        </div>
    )
  }
}

export default BalanceHistory;