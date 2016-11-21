const React = require('react')
const {Link} = require('react-router')

const About = React.createClass({
    render() {
        return (
            <div className="pl3">
                <h2>About App</h2>
                <Link to="/">Home</Link>
            </div>
        )
    }
})

module.exports = About
