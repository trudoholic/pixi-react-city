import AppContext from './AppContext.js'

const AppProvider = ({ children, state }) => {

    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider