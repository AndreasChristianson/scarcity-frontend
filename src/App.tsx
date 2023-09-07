import type {Component} from "solid-js";
import Examples from "./layout/Examples";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

const App: Component = () => (
    <div class="bg-gray-500 text-c h-full">
        <div class="p-2 bg-slate-300 dark:bg-neutral-700 text-slate-900 dark:text-slate-300 flex flex-col max-w-2xl mx-auto">
            <Header/>
            <Menu/>
            <Examples/>
            <Footer/>
        </div>
    </div>
);

export default App;
