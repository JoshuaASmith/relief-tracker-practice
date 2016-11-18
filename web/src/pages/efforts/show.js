const React = require('react')
const {Link} = require('react-router')

const ShowEffort = React.createClass({
    render() {
        return (
            <div>
                <h4>Show Effort</h4>
                <Link to="/efforts">Return</Link>
            </div>
        )
    }
})

module.exports = ShowEffort
