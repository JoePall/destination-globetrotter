import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

function Home() {
  const [open, setOpen] = useState(false);

  return <>  
    <Button
      onClick={() => setOpen(!open)}
      aria-controls="example-collapse-text"
      aria-expanded={open}
    >
      {open ? "Close" : "Open"}
    </Button>
    <Collapse in={open}>
      <div id="example-collapse-text" className="card bg-primary text-light fade m-5 p-5">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
        labore wes anderson cred nesciunt sapiente ea proident.
      </div>
    </Collapse>
  </>;
  }


export default Home;
