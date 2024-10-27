import {createRoot} from 'react-dom/client'
import {ChakraProvider} from '@chakra-ui/react'
import App from './components/App.tsx'
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {theme} from "./features/theme/theme.ts";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ChakraProvider theme={theme}>
            <App/>
        </ChakraProvider>
    </Provider>
)
