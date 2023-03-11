import React from "react";
import { BrowserRouter} from "react-router-dom";
import Header from "./components/Header";
import { AppContext } from "./context/contextApi";
import AppRoutes from "./Router/Routes";
import store from "./Redux/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";



const App = () => {
    return (
        <Provider store={store}>
            <AppContext>
            <BrowserRouter>
            <Toaster/>
                <div className="flex flex-col h-full">
                    <Header />
                    {/* <LeftNav/> */}
                    <AppRoutes/>
                </div>
            </BrowserRouter>
        </AppContext>
        </Provider>
        
    );
};

export default App;
