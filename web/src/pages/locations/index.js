const React = require('react')
const {Link} = require('react-router')

const Locations = React.createClass({
    render() {
        return (
            <div>
                <h3>Locations</h3>
                <Link to="/">Home</Link>
            </div>
        )
    }
})

module.exports = Locations
