import { useEffect, useState } from 'react'
import { thousandWords } from './lib/commonWords'
import { MdSend } from 'react-icons/md'



function App() {
  const [input, setInput] = useState('')
  const [related, setRelated] = useState([])
  const [count, setCount] = useState(0)
  const [output, setOutput] = useState([])
  const [limit, setLimit] = useState(160)
  const sortedThousandWords = thousandWords.sort()

  function handleInputChange(e) {
    setInput(e.target.value)
  }

  useEffect(() => {
    if (input) {
      const maybe = sortedThousandWords.some((word) => word.includes(input))
      if (maybe) {
        setRelated(sortedThousandWords.filter((word) => word.includes(input)))
      } else {
        setRelated([])
      }
    } else {
      setRelated(sortedThousandWords)
    }
  }, [input, sortedThousandWords])

  function reset() {
    setInput('')
    setRelated([])
  }

  function handleCount(num) {
    setCount(prevState => prevState + num)
  }
  function handleSubmit(e) {
    e.preventDefault()
    const noSpaces = input.replace(' ', '')
    if (thousandWords.includes(noSpaces)) {
      addToOutput(noSpaces)
    }
  }

  function addToOutput(word) {
    const charCount = word.length + 1
    if (count + charCount < limit) {
      handleCount(charCount)
      setOutput([...output, `${word}`])
      reset()
    }


  }

  function removeFromOutput(index) {
    const charCount = (output[index].length + 1) * -1
    handleCount(charCount)
    setOutput(output.filter((item, idx) => idx !== index))
  }


  return (
    <div className="font-body min-h-screen w-screen bg-slate-400 flex justify-center items-center ">


      <div className='max-w-3xl w-full flex flex-col  space-y-5  '>
        <div className='flex space-x-2 items-center bg-white w-max px-3 rounded-lg'>
          <label htmlFor="maxChars" className=''>Max Chars:</label>
          <input id="maxChars" type="number" min={0} onChange={(e) => setLimit(e.target.value)} className="outline-none px-3 py-2" />
        </div>

        {/* Output */}
        <div className='relative min-h-[200px] max-h-[200px] bg-white rounded-xl drop-shadow-xl p-7'>
          {output.length > 0
            && <p>
              {output.map((item, idx) => (
                <span onClick={() => removeFromOutput(idx)} className='first:capitalize text-xl inline-block cursor-pointer hover:scale-110 active:scale-90 transtion-all ease-in-out duration-150 mr-1.5'>{item}</span>
              ))}
            </p>
          }
          <span className='absolute bottom-5 right-7'>{count}/{limit} chars</span>
        </div>

        {/* Suggestions */}
        <div className='min-h-[400px] max-h-[400px] bg-white flex justify-center items-center rounded-xl drop-shadow-xl p-7'>

          <ul className='flex flex-wrap items-start  max-h-[350px]  overflow-y-auto w-full '>
            {related.length > 0
              ? related.map((item) => (
                <li onClick={() => addToOutput(item)} key={item} className="hover:drop-shadow-md hover:scale-105 active:scale-90 cursor-pointer transition-all ease-in-out duration-150 mb-3 mr-3 text-xl bg-white border-[1px] px-2 py-1 rounded-md">
                  {item}
                </li>
              ))
              : <p>No Match</p>

            }

          </ul>


        </div>

        {/* Input */}
        <form onSubmit={handleSubmit}>
          <div className="relative text-xl flex space-x-5 p-6 items-center  min-h-[70px] max-h-[70px] h-full w-full  drop-shadow-xl bg-white rounded-xl">
            <input
              placeholder='Type Something...'
              className='  text-gray-900  outline-none w-full h-full '
              value={input}
              onChange={handleInputChange}
            />
            <button disabled={!input} type="submit" className={`${!input ? 'bg-gray-500' : 'bg-[#48c1a1] hover:bg-[#32b592] active:scale-90'} transition-all ease-in-out duration-150 rounded-full flex justify-center items-center w-[50px] h-[45px]  text-white`}>
              <MdSend className='text-xxl' />
            </button>

          </div>
        </form>



      </div>


    </div>
  );
}

export default App;
