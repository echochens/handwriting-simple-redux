import React, {
  Component,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
// import PropTypes from "prop-types";


/*
//高阶函数形式：
    export function connect(mapStateToProps, mapDispatchToProps) {
        return function (WrappedComponent) {
            class Connect extends React.Component {
            static contextTypes = {
                store: PropTypes.object,
            };
            componentDidMount() {
                this.context.subscribe(this.forceUpdate.bind(this));
            }

            render() {
                return (
                <WrappedComponent
                    {...this.props}
                    {...mapStateToProps(this.context.store.getState())}
                    {...mapDispatchToProps(this.context.store.dispatch)}
                ></WrappedComponent>
                );
            }
            }
            return Connect;
        };
    }
*/

const ReduxContext = createContext();
const Provider = ReduxContext.Provider;
const connect =
  (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => (prop) => {
    const [, forceUpdate] = useState([]);

    const store = useContext(ReduxContext);

    store.subscribe(() => {
      forceUpdate([]);
    });

    const props = {
      ...mapStateToProps(store.getState()),
      ...mapDispatchToProps(store.dispatch),
      ...prop,
    };

    return <WrappedComponent {...props} />;
  };

export { Provider, connect };
