import React, { Component } from 'react';
import moment from 'moment';

import * as ROUTES from '../../../../constants/routes';

class RevenueTable extends Component {
    constructor(props) {

        super(props);

        this.state = {
            text: '',
            loading: false,
            donationsFirebase: [],
            expensesFirebase: [],
            limit: 10,
            page: 1,

            // all: [...props.revenues_clothing.map(order => {
            // 	// var o = Object.assign({}, order);
            // 	order.type = 'Store Sale';
            // 	order.unifiedPrice = order.payment.trueTotal
            // 	return order;
            // }), ...props.reportsData.revenue.donations.map(order => {
            // 	// var o = Object.assign({}, order);
            // 	order.type = 'Donation';
            // 	order.unifiedPrice = order.amount
            // 	return order;
            // })]

            all: [],

        };

        this.changeLimit = this.changeLimit.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.reportsData.revenue.donations !== prevProps.reportsData.revenue.donations) { // check if your props is changed

            console.log(`reportsData.revenue.donations received an update`);

            this.setState({
                all: [
                    ...this.props.reportsData.revenue.donations.map(order => {
                        order.type = 'Donation';
                        order.unifiedPrice = order.amount
                        return order;
                    }),
                    ...this.props.reportsData.revenue.orders.map(order => {
                        order.type = 'Store Order';
                        order.unifiedPrice = order.amount
                        return order;
                    })
                ]
            });

        }
    }

    componentDidMount() {
        console.log(`RevenueTable was mounted!`)

        this.setState({
            all: [
                ...this.props.reportsData.revenue.donations.map(order => {
                    order.type = 'Donation';
                    order.unifiedPrice = order.amount
                    return order;
                }),
                ...this.props.reportsData.revenue.orders.map(order => {
                    order.type = 'Store Order';
                    order.unifiedPrice = order.amount
                    return order;
                })
            ]
        });
    }

    changeLimit(limit) {
        this.setState({
            limit: limit
        });
    }

    changePage(page) {
        this.setState({
            page: page
        });
    }

    filterTableFromSubtableSelector(selector) {
        switch(selector) {
            case 'revenue-donations':
                return this.props.reportsData.revenue.donations
            case 'revenue-store':
                return this.props.reportsData.revenue.orders
            case 'revenue-ads':
                return this.props.reportsData.revenue.ads
            case 'revenue-memberships':
                return this.props.reportsData.revenue.memberships
            default:
                return this.state.all
        }
    }

    render () {
        return (
            <table className={`table articles-table table-sm table-hover table-bordered`}>

                <thead>
                    <tr className="table-articles-head">
                        <th scope="col">Date</th>
                        <th scope="col">Type</th>
                        <th scope="col">Order Summary</th>
                        <th className='text-right' scope="col">Total</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        this.filterTableFromSubtableSelector(this.props.subtableSelector).length > 0 ?

                        this.filterTableFromSubtableSelector(this.props.subtableSelector)
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map(sale => 
                        <tr onClick={() => this.props.history.push(ROUTES.TRANSPARENCY_REPORTS + `?id=${sale._id}&type=revenue`)}>
                            <td colSpan="1" className="border-right-0 ">{moment(sale.date).format("LLL")}</td>
                            <td colSpan="1" className="border-right-0 ">{sale.type}</td>
                            <td colSpan="1" className="border-right-0 "></td>
                            <td colSpan="1" className="border-right-0 ">${(sale.unifiedPrice / 100).toFixed(2)}</td>
                        </tr>)

                        :

                        <tr>
                            <td className="p-2" colSpan="4">Nothing to display yet</td>
                        </tr>
                    }

                    <tr>
                        <td colSpan="2" className="border-right-0 table-articles-head">

                        </td>

                        <td colSpan="1" className="border-right-0 text-right table-articles-head">Total:</td>
                        <td colSpan="1" className="border-left-0 table-articles-head">${( this.filterTableFromSubtableSelector(this.props.subtableSelector).reduce((a, b) => a + (parseInt(b['unifiedPrice'] || 0)), 0) / 100).toFixed(2)}</td>
                    </tr>

                </tbody>

            </table>
        )
    }
}

export default RevenueTable