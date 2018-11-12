import React from 'react';
import styles from './SeriesMovies.scss';
import ActionBar from '../Presentational/ActionBar';
import Footer from '../Presentational/Footer';
import ProductItem from '../Presentational/ProductItem';
import config from '../../../config.json';


export default class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            items: [],
            productsFetchStatus: null, // null, 'fetching' or 'fetched'
        };
    }

    componentDidMount() {
    	this.setState({
    		productsFetchStatus: 'fetching',
    	}, this.fetchAll);
    }

    fetchAll() {
        const moviesItems = [];

        fetch(config.getMediaContent)
            .then(response => response.json())
	    .then((data) => {
	        data.entries.map((item) => {
                    if (item.programType == 'movie') { moviesItems.push(item); }
                });
		    this.setState({
		    	total: data.total,
		    	items: moviesItems,
		    	productsFetchStatus: 'fetched',
		    });
	    })
	    .catch((err) => {
	        console.log('Failed to load data', err);
	        this.setState({
	          productsFetchStatus: 'error',
	        });
	      });
    }

    render() {
    	const { total, items, productsFetchStatus } = this.state;

        return (
            <div className={styles.container}>
                <ActionBar />
                <div className={styles.content}>
                    {productsFetchStatus == 'fetched'
                        ? (
                            <div className={styles.gridContainer}>
                                {
			                items.map((item, index) => (
    <ProductItem itemData={item} index={index} key={index} />
			                ))
			            }
                            </div>
                        )
                        : <div style={{ margin: '35px 130px' }}>Loading...</div>
                    }
                </div>
                <Footer />
            </div>
        );
    }
}
