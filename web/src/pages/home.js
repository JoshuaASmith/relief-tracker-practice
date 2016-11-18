const React = require('react')
const {Link} = require('react-router')

const Home = React.createClass({
    render() {
        return (
            <div className="avenir fw1 pl3">
                <h1 className="fw1">Homepage</h1>
                <h3 className="fw1 f2 no-underline">Menu</h3>
                <ul>
                    <li className="no-underline">
                        <Link className="no-underline black hover-bg-moon-gray" to="/about">About</Link>
                    </li>
                    <li>
                        <Link className="no-underline black hover-bg-moon-gray" to="/persons">Persons</Link>
                    </li>
                    <li>
                        <Link className="no-underline black hover-bg-moon-gray" to="/efforts">Efforts</Link>
                    </li>
                    <li>
                        <Link className="no-underline black hover-bg-moon-gray" to="/locations">Locations</Link>
                    </li>
                </ul>
            </div>
        )
    }
})

module.exports = Home
