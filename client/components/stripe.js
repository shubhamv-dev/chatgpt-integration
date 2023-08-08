
import React, { useState } from "react"
function Stripe (){
    const [amount, setAmount] = useState(14.95)
    const [amount2, setAmount2] = useState(49.95)
    const pay = ()=>{
        window.location.href ="https://buy.stripe.com/test_9AQ3cBets5XM2D6fZ1"
    }
    const pay2 = ()=>{
        window.location.href ="https://buy.stripe.com/test_28ofZn998cma6Tm7sw"
    }
    return (
        <div>
        <button  onClick={pay}>
            pay {amount}
        </button>

        <button  onClick={pay2}>
            pay {amount2}
        </button>
        </div>
    )
}
export default Stripe







