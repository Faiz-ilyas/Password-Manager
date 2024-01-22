        import { useState,useCallback,useEffect,useRef } from 'react'


        function App() {
              let [length,setLength]=useState(8);
              let[numberAllow,setNumberAllow]=useState(false);
              let[charAllow,setcharAllow]=useState(false);
              let [password,setPassword]=useState('');    
              const passwordGen=useCallback(()=>{
                    let pass='';
                    let str="ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
                    if(numberAllow){
                      str+='123456789';
                  
                    }
                    if(charAllow){
                      str+='!@#%$^&*()_+~><?/'
                    }
                    
                 
                    for(let i=1;i<=length;i++){
                      let chart=Math.floor(Math.random()*str.length+1);
                        pass+=str.charAt(chart)
                        // console.log(pass)
              }

                setPassword(pass)

              },[length,numberAllow,charAllow,setPassword])          
                useEffect(()=>{
                    passwordGen()
                },[length,numberAllow,charAllow,passwordGen])

                  const passwordRef=useRef(null)
                  const copypass=useCallback(()=>{
                        window.navigator.clipboard.writeText(password)
                  },[password])


          return (
            <>
            
            <div className="flex flex-col items-center justify-center h-screen bg-gray-400">
              <h1 className="text-3xl font-bold mb-6">Password Manager</h1>
                    <div className="p-6">
                        {/* First Input with Copy Button */}
                        <div className="flex items-center space-x-2 mb-4">
                            <input type="text" className="border p-2" placeholder="Enter text..." readOnly value={password}  ref={passwordRef} />
                            <button className="bg-blue-500 text-white p-2" onClick={copypass}>Copy</button>
                        </div>

                        {/* Second Input with Range and Checkboxes */}
                        <div className="flex items-center space-x-4">
                            {/* Input with Range */}
                            <div className="flex items-center space-x-2">
                                <label htmlFor="length" className="mr-2">Length:{length}</label>
                                <input type="range" min="6" max="20" className="border p-2" value={length} onChange={(e)=>{
                                    setLength(e.target.value)
                                }}/>
                            </div>

                            {/* Checkboxes */}
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" name="includeNumbers" className="form-checkbox"  value={numberAllow} onChange={()=>{
                                      setNumberAllow((perv)=>!perv)
                                    }}/>
                                    <span>Include Numbers</span>
                                </label>

                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" name="includeCharacters" className="form-checkbox" value={charAllow}  onChange={()=>{
                                      setcharAllow((prev)=>!prev)
                                    }}/>
                                    <span>Include Characters</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                
            </>
          )
        }

        export default App
