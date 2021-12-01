import React from "react";

const PasswordStrengthIndicator = ({validity : {minChar, number, specialChar}}) => {

    return(
        <div className="password-meter text-left mb-4">
            <p className="text-dark"> Password must contain : </p>
            <div className="text-muted">

                <PasswordStrengthIndicatorItem isValid = {minChar} text = "Have atleast 8 characters"/>
                <PasswordStrengthIndicatorItem isValid = {number}  text = "Have atleast 1 number"/>
                <PasswordStrengthIndicatorItem isValid = {specialChar}  text = "Have atleast 1 special character"/>
            </div>

        </div>
    )
}

const PasswordStrengthIndicatorItem=({isValid, text}) => {

    const highlightClass = isValid ? "text-success" : isValid !== null ? "text-danger" : ""
    return(
        <p className={highlightClass}>{text}</p>
    )
}

export default PasswordStrengthIndicator;