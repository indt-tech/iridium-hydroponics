import React, { useState } from 'react'

const Dialog = ({ children }) => {
    const [isDialogOpen, setDialogOpen] = useState(false)

    const toggleDialog = () => {
        setDialogOpen(!isDialogOpen)
    }
    if (!isDialogOpen) return <button onClick={toggleDialog} style={{ position: 'absolute', top: 10, right: 10 }}>Close</button>
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={toggleDialog}>
            <div style={{ maxWidth: '500px', margin: '40px auto', backgroundColor: 'white', padding: '20px', position: 'relative' }} onClick={e => e.stopPropagation()}>
                {children}
                <button onClick={toggleDialog} style={{ position: 'absolute', top: 10, right: 10 }}>Close</button>
            </div>
        </div>
    )
}

export default Dialog;