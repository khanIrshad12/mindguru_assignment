
import useState from 'react'
const Searchbar = ({data}) => {
    const [sortOrder, setSortOrder] = useState('asc');
  const [filterCriteria, setFilterCriteria] = useState('name');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredData, setFilteredData] = useState(data); // Initialize with all data
  const handleSortChange = (order) => {
    setSortOrder(order);
    const sortedData = sortData(filteredData, filterCriteria, order);
    setFilteredData(sortedData);
  };

  const handleFilterChange = (criteria) => {
    setFilterCriteria(criteria);
    const sortedData = sortData(data, criteria, sortOrder);
    const filteredData = filterData(sortedData, searchKeyword);
    setFilteredData(filteredData);
  };

  const handleSearch = () => {
    const sortedData = sortData(data, filterCriteria, sortOrder);
    const filteredData = filterData(sortedData, searchKeyword);
    setFilteredData(filteredData);
  };
  function sortData(data, criteria, order) {
    let sortedData = [...data];
  
    switch (criteria) {
      case 'name':
        sortedData.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case 'email':
        sortedData.sort((a, b) => (a.email > b.email ? 1 : -1));
        break;
      case 'phone':
        sortedData.sort((a, b) => (a.phone > b.phone ? 1 : -1));
        break;
      case 'lastModified':
        sortedData.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
        break;
      case 'lastInserted':
        sortedData.sort((a, b) => new Date(b.insertedAt) - new Date(a.insertedAt));
        break;
      default:
        break;
    }
  
    if (order === 'desc') {
      sortedData.reverse();
    }
  
    return sortedData;
  }
  
  return (
    <div>
         <div>
        <p>Sort By:</p>
        <button onClick={() => handleSortChange('asc')}>A-Z</button>
        <button onClick={() => handleSortChange('desc')}>Z-A</button>
        <button onClick={() => handleSortChange('lastModified')}>Last Modified</button>
        <button onClick={() => handleSortChange('lastInserted')}>Last Inserted</button>
      </div>
      <div>
        <p>Filter By:</p>
        <button onClick={() => handleFilterChange('name')}>Name</button>
        <button onClick={() => handleFilterChange('email')}>Email</button>
        <button onClick={() => handleFilterChange('phone')}>Phone</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <main className="flex flex-wrap justify-center">
        {filteredData.length > 0 ? (
          filteredData?.map((item, id) => <CardItems key={id} item={item} />)
        ) : (
          <img
            className="h-[300px] md:h-[430px]"
            src="https://i.pinimg.com/originals/49/e5/8d/49e58d5922019b8ec4642a2e2b9291c2.png"
            alt="no data found"
          />
        )}
        </main>
    </div>
  )
}

export default Searchbar