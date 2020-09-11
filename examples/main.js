function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const React = require("react");

const Ink = require("ink");

const {
  FocusManager
} = require("ink-focus");

process.stdin.on("keypress", (_, key) => {
  if (key && key.ctrl && key.name === "c") {
    process.exit(0);
  }
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: null,
      count: 0
    };
  }

  render() {
    return /*#__PURE__*/React.createElement(Ink.Box, {
      flexDirection: "column"
    }, /*#__PURE__*/React.createElement(FocusManager, {
      xArrows: true,
      loop: true,
      onFocusChange: this.onFocusChange.bind(this)
    }, /*#__PURE__*/React.createElement(FocusableBox, null, "box 1"), /*#__PURE__*/React.createElement(FocusableBox, {
      unfocusable: true
    }, "box 2"), /*#__PURE__*/React.createElement(FocusableText, null, " text 3 "), /*#__PURE__*/React.createElement(FocusableBox, null, "box 4"), /*#__PURE__*/React.createElement(FocusableText, {
      unfocusable: true
    }, " text 5 "), /*#__PURE__*/React.createElement(FocusableBox, null, "box 6")), /*#__PURE__*/React.createElement(Ink.Text, null), /*#__PURE__*/React.createElement(Ink.Text, null, "Element ", this.state.index + 1, " focused.", " ", /*#__PURE__*/React.createElement(Ink.Text, {
      color: "yellowBright"
    }, this.state.count)));
  }

  onFocusChange(_oldIndex, newIndex) {
    this.setState({
      index: newIndex,
      count: this.state.count + 1
    });
  }

}

const textStyles = {
  foc: {
    color: "black",
    backgroundColor: "yellowBright"
  },
  unfoc: {
    color: "gray"
  }
};

class FocusableText extends React.Component {
  render() {
    let textProps = {};
    if (this.props.focused) textProps = textStyles.foc;
    if (this.props.unfocusable) textProps = textStyles.unfoc;
    return /*#__PURE__*/React.createElement(Ink.Text, _extends({}, this.props, textProps), this.props.children);
  }

}

const boxStyles = {
  foc: {
    borderStyle: "bold",
    borderColor: "yellowBright"
  },
  unfoc: {
    borderColor: "gray"
  }
};
const boxTextStyles = {
  foc: {
    color: "yellow",
    bold: true
  },
  unfoc: {
    color: "gray"
  }
};

class FocusableBox extends React.Component {
  render() {
    let boxProps = {
      paddingX: 1,
      borderStyle: "single"
    };
    if (this.props.focused) boxProps = { ...boxProps,
      ...boxStyles.foc
    };
    if (this.props.unfocusable) boxProps = { ...boxProps,
      ...boxStyles.unfoc
    };
    let textProps = {
      color: "white"
    };
    if (this.props.focused) textProps = { ...textProps,
      ...boxTextStyles.foc
    };
    if (this.props.unfocusable) textProps = { ...textProps,
      ...boxTextStyles.unfoc
    };
    return /*#__PURE__*/React.createElement(Ink.Box, boxProps, /*#__PURE__*/React.createElement(Ink.Text, textProps, this.props.children));
  }

}

Ink.render( /*#__PURE__*/React.createElement(Main, null));