const React = require("react")
const Ink = require("ink")

module.exports = class FocusManager extends React.Component {
    constructor(props) {
        super(props)
        if (!props.children) throw new Error("FocusManagers must not be empty.")

        const isFM = c => c.type === FocusManager
        const children = [props.children].flat().filter(c => !c.props.unfocusable)
        if (!children.length) throw new Error("FocusManagers must not be empty.")
        if (children.find(isFM)) throw new Error("FocusManagers must not be nested.")

        const focusedSearch = children.findIndex(c => c.props.focused)
        const focused = focusedSearch === -1 ? 0 : focusedSearch

        this.state = { focus: props.noInitialFocus ? null : focused }
        if (!props.noInitialFocus && props.onFocusChange)
            props.onFocusChange(null, focused)
    }

    componentDidMount() {
        process.stdin.on("keypress", this.handleKeypress.bind(this))
    }

    componentWillUnmount() {
        process.stdin.off("keypress", this.handleKeypress.bind(this))
    }

    render() {
        const children = React.Children.map(this.props.children, (child, i) => {
            if (
                (child.props.focused && i !== this.state.focus) ||
                (!child.props.focused && i === this.state.focus)
            ) {
                return React.cloneElement(child, {
                    ...child.props,
                    focused: i === this.state.focus
                })
            }
            return child
        })

        return <Ink.Box {...this.props}>{children}</Ink.Box>
    }

    handleKeypress(char, key) {
        if (!key) return
        let direction = this.props.filter ? this.props.filter(char, key) : null
        const { tab, arrows, xArrows, yArrows } = this.props
        const { name } = key

        if (
            (tab && name === "tab") ||
            ((arrows || xArrows) && name === "right") ||
            ((arrows || yArrows) && name === "down")
        ) {
            direction = "next"
        } else if (
            ((arrows || xArrows) && name === "left") ||
            ((arrows || yArrows) && name === "up")
        ) {
            direction = "prev"
        }

        if (!["prev", "next"].includes(direction)) return
        const loop = tab && !arrows && !xArrows && !yArrows ? true : this.props.loop
        this.changeFocus(direction, loop)
    }

    changeFocus(direction, loop, skip) {
        const children = [this.props.children].flat()
        const amount = skip ? 2 : 1
        const oldFocusIndex = this.state.focus === null ? -1 : this.state.focus
        let newFocusIndex = oldFocusIndex + (direction === "next" ? amount : -amount)

        if (newFocusIndex >= children.length) {
            if (loop) newFocusIndex = 0
            else newFocusIndex = children.length - 1
        } else if (newFocusIndex < 0) {
            if (loop) newFocusIndex = children.length - 1
            else newFocusIndex = 0
        }
        if (this.state.focus === newFocusIndex) return

        if (this.state.focus !== null) {
            const oldFocus = children[this.state.focus]
            if (oldFocus.props.onBlur) oldFocus.props.onBlur()
        }

        const newFocus = children[newFocusIndex]
        if (newFocus.props.onFocus) newFocus.props.onFocus()

        // an infinite loop shouldn't happen in the first place, as the constructor
        // already checks if it contains nothing but unfocusable elements, but
        // "skip" is still checked; better safe than sorry
        if (children[newFocusIndex].props.unfocusable && !skip) {
            this.changeFocus(direction, loop, true)
        } else {
            this.setState({ focus: newFocusIndex })
            if (this.props.onFocusChange)
                this.props.onFocusChange(this.state.focus, newFocusIndex)
        }
    }
}
