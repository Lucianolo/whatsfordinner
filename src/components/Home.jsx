import React, { Component } from 'react'
import '../App.css'
import { connect } from 'react-redux';
import { loadTables } from './../redux/actions/actions'

const mapStateToProps = state => {
    return {
        tables: state.tables.tables
    }
}

class Home extends Component {

    componentDidMount() {
        this.props.loadTables()
    }

    render() {
        return (
            <div className='home'>
                {this.props.tables.map((table) => (
                    <div
                        className='table'
                        key={table._id}
                    >
                        <div className='table--head'>
                            {table.category}
                        </div>
                        <div className='table--body'>

                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
export default connect(mapStateToProps, { loadTables })(Home)
