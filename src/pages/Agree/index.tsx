import './styles.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const AgreePage: React.FC = () => {
    const navigate = useNavigate()
    return <div className="agreePage">
        <div className="agreePageBack" onClick={() => navigate(-1)}>Back</div>
        <div className="agreeCard">
            <div className="agreeCardHeader">Agreement</div>
            <div className="agreeCardText">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
        </div>
    </div>
}