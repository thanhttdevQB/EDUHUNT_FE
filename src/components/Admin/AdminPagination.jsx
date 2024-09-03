import React from 'react'

const AdminPagination = () => {
    return (
        <div className='p-2.5 flex justify-between'>
            <button className='py-1.5 px-2.5 cursor-pointer'>&lt;&lt; Previous</button>
            <button className='py-1.5 px-2.5 cursor-pointer'>Next &gt;&gt;</button>
        </div>
    )
}

export default AdminPagination
