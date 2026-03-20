import React from 'react'

const Select = ({setSelectedCity}) => {
    

    const cities = ["Tiruchirappalli", "Chennai", "Madurai", "Coimbatore", "Tirunelveli", "Kanyakumari", "Kodaikanal", "Udhagamandalam", "Puducherry"];

    return (

        <>
            <div className="selectCard">
                <h1>Select City :</h1>
                <select name="" id="" onChange={(e)=>setSelectedCity(e.target.value)}>
                    {
                        cities.map((e,index)=>(
                            <option value={e} key={index}>{e}</option>
                        ))
                    }
                </select>
            </div>
        </>
    )
}

export default Select