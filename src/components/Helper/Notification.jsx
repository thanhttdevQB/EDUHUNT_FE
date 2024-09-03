

import { notification } from "antd"


export default Noti =(message,type)=>{
    return (
        
        notification.open({
            message: "Notification",    

            description: message
            
        })
    )
}