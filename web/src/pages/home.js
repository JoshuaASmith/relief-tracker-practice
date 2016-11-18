const React = require('react')
const {Link} = require('react-router')

const Home = React.createClass({
    render() {
        return (
            <div>
                <h2>I am home.</h2>
                <h3>Menu</h3>
                <ol>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ol>
            </div>
        )
    }
})

module.exports = Home
