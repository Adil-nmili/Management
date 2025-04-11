import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { useState } from 'react'
import Departement from '../../../services/Departement'
import SelectManager from './SelectManager'


const DeparetemnentForm = () => {

    const  [name, setName] = useState("")
    const [manager, setManager] = useState("")

    const handleManager = (managers) => {
        setManager(managers)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('name',name)
        data.append('manager_id',manager)
        try{
            const response = await Departement.create(data).then(response => response)
            response.status >= 200 && response.status < 300 ? alert(response.data) : alert(response.data)
        } catch(error){
            console.log(error)
        }
    }

  return (
   <form
        className='w-full mx-auto mt-10 '
        onSubmit={handleSubmit}
   >
    <div>
        <Label className='my-4'>Deparetement Name:</Label>
        <Input type='text' onChange={e => setName(e.target.value)} value={name} placeholder='Create New Departement...' name='name' />
    </div>
    <div>
        <Label className='my-4'>Manager:</Label>
        <SelectManager handleManager={handleManager}  />
    </div>
    <Button className='my-4'>Create</Button>
   </form>
  )
}

export default DeparetemnentForm
