const React = require('react')
const {Link} = require('react-router')

const About = React.createClass({
    render() {
        return (
            <div className="avenir fw1 tc">
                <h2 className="fw1 f2">About Relief Tracker</h2>
                <blockquote className="ml2 mt0 mb4 pl4 black-90 bl bw2 b--dark-blue">
                    <p className="f4">
                        This relief tracker is designed to allow the user to track which relief efforts have been started, are in progress, or have been completed previously. It will also tell the user who is involved in each project and the locations of the projects.
                    </p>
                </blockquote>
                <Link className="mt3 no-underline black hover-bg-moon-gray" to="/">Home</Link>
            </div>
        )
    }
})

module.exports = About
