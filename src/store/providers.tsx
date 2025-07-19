"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { store } from ".";
import { Provider} from "react-redux";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }){
    return(
        <SessionProvider>
            <NextUIProvider>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>{children}</Provider>
                </QueryClientProvider>
            </NextUIProvider>
        </SessionProvider>
    )
}