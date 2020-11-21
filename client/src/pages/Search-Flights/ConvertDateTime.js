import moment from "moment";

function ConvertDateTime(props) {
    let returndatetime = "";
    let splitdatetime = [];
    console.log("in ConvertDateTime");
    console.log("convertdatetime props = ",  props);
  
    let removezerosandz = props.replace(":00.000Z", "");

    splitdatetime = removezerosandz.split("T");
    console.log("striptime = ", splitdatetime);
    let formatdate = moment(splitdatetime[0]).format("DD/MM/YYYY")

    returndatetime = formatdate + " @ " + splitdatetime[1];
  
    return returndatetime;
  }
  
  export default ConvertDateTime;