import {createRoot} from "react-dom/client";
import {BrowserRouter} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {MantineProvider} from '@mantine/core';
import '@mantine/core/styles.css';
import App from './App';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <MantineProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </MantineProvider>
    </QueryClientProvider>
);
