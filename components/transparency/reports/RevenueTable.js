import React, { Component } from 'react';
import moment from 'moment';

import ROUTES from '../../../components/constants/routes';

class RevenueTable extends Component {
    constructor(props) {

        super(props);

        this.state = {
            text: '',
            loading: false,

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

            all: [

                ...this.props.reportsData.revenue.donations.map(order => {
                    order.type = 'Donation';
                    order.unifiedPrice = order.amount
                    return order;
                }),

                ...this.props.reportsData.revenue.orders.map(order => {
                    order.type = 'Store Order';
                    order.unifiedPrice = order.payment.total
                    return order;
                }),

                ...this.props.reportsData.revenue.ads
                .filter(ad => {
                    return !ad.test_ad
                })    
                .map(ad => 
                    {
                        ad.type = "Ad"
                        ad.unifiedPrice = ad.price_total
                        return ad;
                    }
                )

            ]

        };

        this.changeLimit = this.changeLimit.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentDidUpdate(prevProps) {

        if (this.props.reportsData !== prevProps.reportsData) {

            console.log(`reportsData received an update`);

            this.setState({
                all: [
                    ...this.props.reportsData.revenue.donations.map(order => {
                        order.type = 'Donation';
                        order.unifiedPrice = order.amount
                        return order;
                    }),
                    ...this.props.reportsData.revenue.orders.map(order => {
                        order.type = 'Store Order';
                        order.unifiedPrice = order.payment.total
                        return order;
                    }),
                    ...this.props.reportsData.revenue.ads
                    .filter(ad => {
                        return !ad.test_ad
                    })    
                    .map(ad => 
                        {
                            ad.type = "Ad"
                            ad.unifiedPrice = ad.price_total
                            return ad;
                        }
                    )
                ]
            });

        }

    }

    componentDidMount() {

        console.log(`RevenueTable was mounted!`)

        console.log(
            this.props.reportsData.revenue
        )

        // this.setState({
        //     all: [
        //         ...this.props.reportsData.revenue.donations.map(order => {
        //             order.type = 'Donation';
        //             order.unifiedPrice = order.amount
        //             return order;
        //         }),
        //         ...this.props.reportsData.revenue.orders.map(order => {
        //             order.type = 'Store Order';
        //             order.unifiedPrice = order.amount
        //             return order;
        //         })
        //     ]
        // });

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

                const correctedAds = this.props.reportsData.revenue.ads
                .filter(ad => {
                    return !ad.test_ad
                })    
                .map(ad => 
                    {
                        ad.type = "Ad"
                        ad.unifiedPrice = ad.price
                        return ad;
                    }
                )

                return correctedAds

            case 'revenue-memberships':
                return this.props.reportsData.revenue.memberships
            default:
                return [...this.state.all]
        }
    }

    render () {
        return (
            <table className={`table articles-table table-sm table-hover table-bordered`}>

                <thead>
                    <tr className="table-articles-head">
                        <th scope="col">Date</th>

                        {this.props.subtableSelector == 'revenue-all' && <th scope="col">Type</th>}
                        
                        {this.props.subtableSelector != 'revenue-donations' && <th scope="col">Order Summary</th>}

                        {this.props.subtableSelector === 'revenue-donations' && <th scope="col">From</th>}
                        {this.props.subtableSelector === 'revenue-donations' && <th scope="col">Note</th>}

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

                            {this.props.showTransactionTime ? 
                                <td colSpan="1" className="border-right-0 ">{moment(sale.date).format("LLL")}</td>
                            : 
                                <td colSpan="1" className="border-right-0 ">{moment(sale.date).format("LL")}</td>
                            }

                            {this.props.subtableSelector != 'revenue-donations' &&  <td colSpan="1" className="border-right-0 ">{sale.type}</td>}
                            {this.props.subtableSelector === 'revenue-donations' && <td colSpan="1" className="border-right-0 ">{sale.user_id?.first_name} {sale.user_id?.last_name}</td>}

                            <td colSpan="1" className="border-right-0 "></td>
                            
                            <td colSpan="1" className="border-right-0 ">${(sale.unifiedPrice / 100).toFixed(2)}</td>

                        </tr>)

                        :

                        <tr>
                            <td className="p-2" colSpan="4">No data to display</td>
                        </tr>
                    }

                    <tr className="table-footer">
                        <td 
                            colSpan={
                                this.props.subtableSelector == 'revenue-donations' ? 2 : 2
                            } 
                            className="border-right-0 table-articles-head"
                        >

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