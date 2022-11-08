import AppContext from './AppContext.js'

const AppProvider = ({ children, fontLoad }) => {

    return (
        <AppContext.Provider value={fontLoad}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider