import Header from '@/components/header'
import Headerlogo from '@/components/header-logo'
type props = {
    children?: React.ReactNode
}


const DashboardLayout = ({children}: props) => {
  return (
    <>  
        <Header />
        <main className='px-3 lg:px-14'>{children}</main>
    </>
  )
}

export default DashboardLayout