import { Search } from 'lucide-react';
function SearchFolder({setQuery}) {
    return (
        <div className="search-bar items-center flex mb-10 mt-10 bg-[#DEDEDE] w-full rounded-lg h-15">
            <div className="ml-3 mr-4 mt-1.5 text-gray-600 flex items-center">
                <Search/>
            </div>
            <input
                className="w-full h-15 text-lg outline-0 opacity-90"
                type="text"
                placeholder="Search Folders..."
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
        </div>
    )
}

export default SearchFolder;