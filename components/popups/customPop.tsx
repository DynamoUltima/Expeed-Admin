import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
    Alert,
  } from "@material-tailwind/react";
import { useState } from "react";
import { Clients } from "../../pages/datatable";


const CustomPop = ({deletedClient}:{deletedClient:Clients}) => {

    const [show, setShow] = useState(true)
    setTimeout(() => {
        setShow(false);
      }, 5000)
    return (
        <Alert

        show={show}
        color="red"
        dismissible={{
          onClose: () => setShow(false),
        }}> {deletedClient.firstName +' ' + deletedClient.lastName} deleted successfully.</Alert>

    );
}


export default CustomPop;