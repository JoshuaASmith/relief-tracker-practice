const React = require('react')
const {Banner, Heading} = require('rebass')

const Home = React.createClass({
    render() {
        return (
            <div className="avenir fw1 tc">
                <Banner align="center" backgroundImage="https://static.pexels.com/photos/14676/pexels-photo-14676.png">
                    <Heading level={2} size={0}>
                        Relief Tracker
                    </Heading>
                </Banner>
            </div>
        )
    }
})

module.exports = Home
