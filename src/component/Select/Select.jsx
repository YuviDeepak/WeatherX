import React, { useEffect, useState } from 'react'

const Select = ({ setSelectedCity, selectedCity, country, sc, setSc }) => {

    useEffect(() => {
        if (sc !== "India") {
            setSelectedCity(country[sc][0])
        }
    }, [sc])


    return (
        <>
            <div className="selectBox">
                <div className="selectCard">
                    <h3>Select Country :</h3>
                    <select name="" id="" value={sc} onChange={(e) => setSc(e.target.value)}>
                        {
                            Object.keys(country).map((e, i) => (
                                <option value={e} key={i}>{e}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="selectCard">
                    <h3>Select City :</h3>
                    <select name="" id="" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                        {
                            sc && country[sc]?.map((city, i) => (
                                <option value={city} key={i}>{city}</option>
                            ))

                        }
                    </select>
                </div>
            </div>

        </>
    )
}

export default Select