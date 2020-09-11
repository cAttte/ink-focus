const React = require("react")
const Ink = require("ink")
const { FocusManager } = require("ink-focus")

process.stdin.on("keypress", (_, key) => {
    if (key && key.ctrl && key.name === "c") {
        process.exit(0)
    }
})

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = { index: null, count: 0 }
    }

    render() {
        return (
            <Ink.Box flexDirection="column">
                <FocusManager xArrows loop onFocusChange={this.onFocusChange.bind(this)}>
                    <FocusableBox>box 1</FocusableBox>
                    <FocusableBox unfocusable>box 2</FocusableBox>
                    <FocusableText> text 3 </FocusableText>
                    <FocusableBox>box 4</FocusableBox>
                    <FocusableText unfocusable> text 5 </FocusableText>
                    <FocusableBox>box 6</FocusableBox>
                </FocusManager>
                <Ink.Text></Ink.Text>
                <Ink.Text>
                    Element {this.state.index + 1} focused.{" "}
                    <Ink.Text color="yellowBright">{this.state.count}</Ink.Text>
                </Ink.Text>
            </Ink.Box>
        )
    }

    onFocusChange(_oldIndex, newIndex) {
        this.setState({ index: newIndex, count: this.state.count + 1 })
    }
}

const textStyles = {
    foc: { color: "black", backgroundColor: "yellowBright" },
    unfoc: { color: "gray" }
}

class FocusableText extends React.Component {
    render() {
        let textProps = {}
        if (this.props.focused) textProps = textStyles.foc
        if (this.props.unfocusable) textProps = textStyles.unfoc

        return (
            <Ink.Text {...this.props} {...textProps}>
                {this.props.children}
            </Ink.Text>
        )
    }
}

const boxStyles = {
    foc: { borderStyle: "bold", borderColor: "yellowBright" },
    unfoc: { borderColor: "gray" }
}

const boxTextStyles = {
    foc: { color: "yellow", bold: true },
    unfoc: { color: "gray" }
}

class FocusableBox extends React.Component {
    render() {
        let boxProps = { paddingX: 1, borderStyle: "single" }
        if (this.props.focused) boxProps = { ...boxProps, ...boxStyles.foc }
        if (this.props.unfocusable) boxProps = { ...boxProps, ...boxStyles.unfoc }

        let textProps = { color: "white" }
        if (this.props.focused) textProps = { ...textProps, ...boxTextStyles.foc }
        if (this.props.unfocusable) textProps = { ...textProps, ...boxTextStyles.unfoc }

        return (
            <Ink.Box {...boxProps}>
                <Ink.Text {...textProps}>{this.props.children}</Ink.Text>
            </Ink.Box>
        )
    }
}

Ink.render(<Main />)
