const React = require('react')
const {BrowserRouter, Link, Match} = require('react-router')
const Home = require('./pages/home')
const About = require('./pages/about')

const App = React.createClass({
    render() {
        return (
            <BrowserRouter>
                <div>
                    <h1>Hello World</h1>
                    <Link to="/about">About</Link>
                    <Match/>

                </div>
            </BrowserRouter>
        )
    }
})
module.exports = App
