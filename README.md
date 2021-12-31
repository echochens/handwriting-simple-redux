# handwriting-simple-redux
    store 文件夹中手写实现了简易版本的 connect、createStore 的 api

### connect 实现方式

    - 高阶函数版本：

        ```javascript
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
        ```

    - hooks版本：

        ```javascript
            const ReduxContext = createContext();
            const Provider = ReduxContext.Provider;
            const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => (
            prop
            ) => {
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
        ```

### createStore

```javascript
    export const createStore = (reducer) => {
    let state,
        listeners = [];

    const getState = () => {
        return state;
    };

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    };

    const subscribe = (listerner) => {
        if (!listeners.includes(listerner)) {
        listeners.push(listerner);
        }
        return function() {
        listeners = listeners.filter((l) => l !== listerner);
        };
    };
    //執行業務中不存在的type，目的是初始化state
    dispatch({
        type: "@@react-redux-init@@",
    });

    return {
        getState,
        dispatch,
        subscribe,
    };
    };
```
