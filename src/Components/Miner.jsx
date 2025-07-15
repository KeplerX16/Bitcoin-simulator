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
        const date = new Date();
        const value = date.getTime();
        const prefix = "0".repeat(rawdata.difficulty);
        const basedata = rawdata.basedata;
        const interval = setInterval(
          () => {
            for(let i = 0;i < 10000;i++) {
            const data = basedata + nounce + value;
            const hash = sha256(sha256(data));
            if (hash.startsWith(prefix)) {
              setHashes(nounce);
              setResult(`Found nonce: ${nounce} \n Hash: ${hash}`);
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
    <div className="p-4 bg-black text-green-400 font-mono shadow-md w-screen h-screen ">
      <h2 className="text-lg mb-2 flex justify-center">⛏ Bitcoin Mining Simulator</h2>
      <div className=' flex gap-2 '>
        <section>
          <form>
            <div className="mb-4">
              <label className="block mb-2  font-semibold">Difficulty:</label>
              <input
                type="number"
                placeholder = {`Write any Natural number ${rawdata.difficulty ? `, default : ${rawdata.difficulty}` : " [*Compulsory]"}`}
                onChange={(e) => setData({...rawdata, difficulty: parseInt(e.target.value)})}
                className="border border-gray-300 p-2 rounded w-170  text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2  font-semibold">Base Data:</label>
              <input
                type="text"
                placeholder = {`Write any string of your choice ${rawdata.basedata ? `, default : ${rawdata.basedata}` : " [*Compulsory]"}`}
                onChange={(e) => setData({...rawdata, basedata: e.target.value})}
                className="border border-gray-300 p-2 rounded w-170  text-white"
              />
            </div>
            <div>
              <label>
                Current time : <Clock />
              </label>
            </div>
        </form>
        </section>
        <section className=' flex h-75 ml-auto'>
          <textarea 
          className='border-2 border-gray-600 h-45 py-3 mt-2 w-170 p-3 place-content-evenly rounded-lg'
          value = "Hi,Welcome to Bitcoin mining simulation , this program duplicates the process of mining a real bitcoin , here this program takes the trascation string i.e. the basedata you give! and the present timestamp is added the it hashes the string by adding nounces , then searches for the hash which starts with no.of zero's you mentioned in difficulty area"
          >
          </textarea>
        </section>
      </div>
      <button
        onClick={mineBlock}
        disabled={mining}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold flex ml-auto mr-auto py-2 px-4 rounded"
      >
        {mining ? "Mining..." : "Start Mining"}
      </button>

      <div className="mt-4 whitespace-pre-line">
        {result}
      </div>
    </div>
    </>
  )
}

export default Miner;