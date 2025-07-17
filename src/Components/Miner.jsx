import { useState } from "react";
import { sha256 } from "js-sha256";
import Clock from "./Clock";

function Miner () {
  const [mining, setMining] = useState(false);
  const [hashes, setHashes] = useState(0);
  const [result, setResult] = useState("");
  const [rawdata,setData] = useState({difficulty : 5 , basedata : "Shadow"});

    const mineBlock = () => {
        setMining(true);
        setResult("");
        setHashes(0);
        let nounce = 0;
        const time1 = new Date().getTime();
        const prefix = "0".repeat(rawdata.difficulty);
        const basedata = rawdata.basedata;
        const interval = setInterval(
          () => {
            for(let i = 0;i < 10000;i++) {
            const data = basedata + nounce + time1;
            const hash = sha256(sha256(data));
            if (hash.startsWith(prefix)) {
              setHashes(nounce);
              const time2 = new Date().getTime();
              const timetaken = (time2 - time1)/1000;
              setResult(`\nFound nonce: ${nounce} \nHash: ${hash} \nTimetaken: ${timetaken} seconds`);
              setMining(false);
              clearInterval(interval);
              return;
            }
            nounce++;
            }

          },1)

    }
     
  return (
    <>
    <div className="p-4 bg-black text-green-400 font-mono shadow-md w-full min-h-screen overflow-x-hidden md:h-screen md:w-screen">
      <h2 className="mb-2 flex text-3xs justify-center-safe md:text-3xl md:max-w-full">⛏ Bitcoin Mining Simulator</h2>
      <div className=' flex-row gap-2 md:flex md:gap-3 md:items-center md:max-w-full'>
        <section>
          <form>
            <div className="mb-4">
              <label className="block mb-2 text-xs font-semibold md:text-xl md:w-185">Difficulty: 
                <br/>
              <input
                type="number"
                placeholder = {`Write any Natural number ${rawdata.difficulty ? `, default : ${rawdata.difficulty}` : " [*Compulsory]"}`}
                onChange={(e) => setData({...rawdata, difficulty: parseInt(e.target.value)})}
                className="border border-gray-300 px-1 rounded text-xs w-full text-white md:text-[16px] md:py-2 md:p-2"
              /></label>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-xs font-semibold md:text-xl md:w-185">Base Data:
              <br/>
              <input
                type="text"
                placeholder = {`Write any string of your choice ${rawdata.basedata ? `, default : ${rawdata.basedata}` : " [*Compulsory]"}`}
                onChange={(e) => setData({...rawdata, basedata: e.target.value})}
                className="border border-gray-300 px-1 rounded text-xs w-full text-white md:text-[16px] md:py-2 md:p-2"
              /></label>
            </div>
            <div>
              <h1 className="text-xs font-semibold md:text-xl">
                Current time : <Clock />
              </h1>
            </div>
        </form>
        </section>
        <section className='flex flex-col md:mt-2'>
          <textarea 
          className='border-2 border-gray-600 h-45 p-3 mt-2 w-full text-xs place-content-start rounded-lg md:w-185 md:h-40 md:text-[16px]'
          value = "Hi,Welcome to Bitcoin mining simulation , this program duplicates the process of mining a real bitcoin , here this program takes the trascation string i.e. the basedata you give! and the present timestamp is added the it hashes the string by adding nounces , then searches for the hash which starts with no.of zero's you mentioned in difficulty area"
          >
          </textarea>
        </section>
      </div>
      <button
        onClick={mineBlock}
        disabled={mining}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold flex mt-2 ml-auto mr-auto py-2 px-4 rounded"
      >
        {mining ? "Mining..." : "Start Mining"}
      </button>
      {rawdata.difficulty > 6 && 
              <p className='text-xs md:text-[16px] mt-4 md:mt-3 text-green-300'> Searching for a hash with more than 6 leading zeroes can take a long time, please be patient!..(may take from few minutes to hours(or even days!!!) depending on your device's processing power)
              If you want to test the mining process quickly, set difficulty to 6 or less.
                </p>}
      {result && 
      <textarea
      value={{result} ? result : ""} 
      className="mt-4 whitespace-pre-line w-full h-20 break-words text-xs align-left place-content-center md:text-[16px] md:w-185 md:h-40 md:justify-center md:flex md:items-center md:mr-auto md:ml-auto">
      </textarea>}
    </div>
    </>
  )
}

export default Miner;