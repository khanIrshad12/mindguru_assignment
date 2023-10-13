"use client"
import { useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';
import CardItems from "@/components/CardItems";
import UserInfo from "@/components/UserInfo";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Dashboard() { 
  const params = useParams();
  const { id } = params;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("A-Z");
  const [data, setData] = useState([]);
  const dataStorageKey = 'Itemdata'; // Key for storing data in IndexedDB
  useEffect(() => {
    set(dataStorageKey, data).catch(error => {
      console.error('Error saving data to IndexedDB:', error);
    });
  }, [data]);

  useEffect(() => {
    get(dataStorageKey)
      .then(savedData => {
        if (savedData) {
          setData(savedData);
        }
      })
      .catch(error => {
        console.error('Error getting data from IndexedDB:', error);
      });

    fetch(`http://localhost:3000/api/useriddb/?id=${id}`, {
      cache: 'no-store',
    })
      .then(res => res.json())
      .then(fetchedData => {
        if (fetchedData) {
          // Save fetched data to IndexedDB for future use
          set(dataStorageKey, fetchedData).catch(error => {
            console.error('Error saving data to IndexedDB:', error);
          });
          setData(fetchedData);
        }
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
      });
      
  }, [id]);

  const filteredData =data && data.data ? data.data.filter(
    (item) =>
      item.name.includes(searchTerm) ||
      item.phone.includes(searchTerm) ||
      item.email.includes(searchTerm)
  ):"";
 

  const sortedData = filteredData && filteredData?.sort((a, b) => {
    switch (sortType) {
      case "A-Z":
        return a.name.localeCompare(b.name);
      case "Z-A":
        return b.name.localeCompare(a.name);
      case "Last modified":
        return new Date(b.modifiedDate) - new Date(a.modifiedDate);
      case "Last inserted":
        return new Date(b.insertedDate) - new Date(a.insertedDate);
      default:
        return filteredData;
    }
  });

  return (
    <>
      <p className="flex justify-center mt-3 text-2xl font-serif font-semibold">
        Dashboard Detail
      </p>
      <div className='flex flex-col md:flex-row justify-center items-center my-5   md:gap-5'>
      <input className=''
        type="text"
        placeholder="Search..."
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <p className='text-sm mt-2 '>Sort By:</p><select className='border-[1px] rounded-lg w-[152px] h-10 mt-2 ' onChange={(event) => setSortType(event.target.value)}>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="Last modified">Last modified</option>
        <option value="Last inserted">Last inserted</option>
      </select>
      </div>

      <div className="flex flex-row justify-between mx-4 items-center ">
        <UserInfo />
        <Link href={`/adddetails/${id}`}>
          <button className="md:mr-10 bg-green-500 text-white font-bold px-6 h-10">
            Add Item
          </button>
        </Link>
      </div>
      <main className="flex flex-wrap justify-center">
        {sortedData.length > 0 ? (
          sortedData?.map((item, id) => <CardItems key={id} setData={setData} item={item} />)
        ) : (
          <img
            className="h-[300px] md:h-[430px]"
            src="https://i.pinimg.com/originals/49/e5/8d/49e58d5922019b8ec4642a2e2b9291c2.png"
            alt="no data found"
          />
        )}
      </main>
    </>
  );
}
