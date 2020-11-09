function ConvertDateTime(props) {
    let returndatetime = "";
    let splitdatetime = [];
    console.log("in ConvertDateTime");
    console.log("convertdatetime props = ",  props);
  
    let removezerosandz = props.replace(":00.000Z", "");

    splitdatetime = removezerosandz.split("T");
    console.log("striptime = ", splitdatetime);

    returndatetime = splitdatetime[1] + " " + splitdatetime[0];
  
    return returndatetime;
  }
  
  export default ConvertDateTime;