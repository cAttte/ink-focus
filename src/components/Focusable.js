const React = require("react")
const Ink = require("ink")

module.exports = class Focusable extends React.Component {
    render() {
        const props = this.props.focused
            ? { ...this.props, ...this.props.focus }
            : this.props
        return <Ink.Box {...props}>{this.props.children}</Ink.Box>
    }
}
