import React from 'react'
import NavB from './NavB'
import NavMenu from './NavMenu'

function Home() {
  // const [ show,setShow ] = useState(  tag === 'd-none' ? "d-none" : "d-block"  ) {Contenu}

  return (
    <div className='container-fluid'>
      <div className="row">
        <NavMenu/>
h
      </div>
        <div className="row">
           {/* <div className='col-2'>
                <NavB placement='start' name='' />
           </div> */}
           <div className='col-10'>
               home
           </div>
           
        </div>

    </div>
  )
}

export default Home