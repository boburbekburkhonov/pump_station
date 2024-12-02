import React from 'react'
import { useLocation } from "react-router-dom";

function ConfireCodePage() {
    const location = useLocation();
    const { phone, username } = location.state || {};
    return (
        <div>
            <h1>
                {
                    phone
                }
            </h1>

            
            <h1>
                {
                    username
                }
            </h1>
        </div>
    )
}

export default ConfireCodePage