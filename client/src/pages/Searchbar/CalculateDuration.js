function CalculateDuration(duration) {

    let returnduration = "";

    let calcduration = duration/60/60
    let fixedcalcduration = calcduration.toFixed(2)
    if (fixedcalcduration > 8) {
        returnduration = -1
    } else {
        returnduration = fixedcalcduration
    }

    return (returnduration)

}

export default CalculateDuration