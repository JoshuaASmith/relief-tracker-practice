const React = require('react')
const {Link} = require('react-router')

const ShowLocation = React.createClass({
    render() {
        return (
            <div>
                <h3>Locations</h3>
                <Link to="/locations">Return</Link>
            </div>
        )
    }
})

module.exports = ShowLocation
