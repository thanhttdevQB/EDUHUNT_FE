import React from 'react'

const AdminSearch = ({placeholder, userSearchList}) => {
    return (
        <div className='flex items-center gap-2.5 bg-[#f3f3f3] p-2.5 rounded-xl w-max'>
            <input type="text" placeholder={placeholder} className='bg-[#f3f3f3] border-none color-[#b4b4b4] outline-none' onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        userSearchList(event.target.value);
                    }
                }}/>
        </div>
    )
}

export default AdminSearch
