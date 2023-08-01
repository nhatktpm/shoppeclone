import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const routerElement = useRouteElements()

  return <div className=''>
    {routerElement}
    <ToastContainer />
  </div>
}

export default App
