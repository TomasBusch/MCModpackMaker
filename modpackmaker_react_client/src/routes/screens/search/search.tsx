import SearchBar from "./searchBar";
import SearchResults from "./searchResults";
import SearchSidebar from './searchSidebar';

export default function Search(){

    return( 
    <>
        <div className="flex h-full mr-4 md:gap-4 xl:mx-4 xl:justify-center lg:justify-start">
            <aside className="flex flex-col mb-4">
                <SearchSidebar />
            </aside>  
            <main className="flex flex-col flex-1 w-5/6 h-full bg-transparent rounded-md xl:max-w-6xl">
                <SearchBar />
                <SearchResults />
            </main>
        </div>
    </>
    );
}