

export default function getDevices(){
   const [list,setlist]=useState([]);
   useEffect(() => {
       fetch('/api/devices')
       .then(data => data.json())
       .then(setlist(data))
       return list
   }, [])


}