import Head from 'next/head';
import styles from '../styles/Home.module.css';
import  InputHints  from 'react-input-hints';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {isMobile} from 'react-device-detect';
import QRCode from "react-qr-code";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CopyToClipboardButton from "../components/CopyToClipboardButton";
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '3px solid #4200FF',
  boxShadow: 24,
  p: 4,
  borderRadius: "40px"
};

const url = 'https://node-sdk.akshaynarisetti.repl.co/templatelink';
// const url = 'http://localhost:3000/register';

export default function Home() {
  const [uid, setUid] = useState(null);
  const [qr, setQr] = useState(null);
  const [qrUrl, setQrUrl] = useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const storedUid = localStorage.getItem('uid');
    if (storedUid) {
      setUid(storedUid);
    } else {
      const newUid = uuidv4();
      localStorage.setItem('uid', newUid);
      setUid(newUid);
    }

  }, []);

  var [username, setUsername]  =  useState("");

  const updateUsername = (e) => {
    setUsername(e.target.value)
  }

  const onSubmit = () => {
    axios
  .get(url, {
    params: {
      username
    }
  })
  .then((response) => {
    if(isMobile ){
      setQrUrl(response.data.reclaimUrl);
      handleOpen();
    }else{
      setQrUrl(response.data.reclaimUrl);
      handleOpen();
    }
    
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
    
  }

  const onEnter = (e) => {

    if (e.key !== 'Enter') return;

    axios
  .get(url, {
    params: {
      username
    }
  })
  .then((response) => {
    if(isMobile ){
      setQrUrl(response.data.reclaimUrl);
      handleOpen();
    }else{
      setQrUrl(response.data.reclaimUrl);
      handleOpen();
    }
    
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });

  
  }


  return (

    <div className={styles.container}>
      <Head>
        <title>Tumblr Provider</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
  <div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div style={{ textAlign: "center", fontWeight: "800" }}>
          <QRCode value={!qrUrl ? "reclaimprotocol.org" : qrUrl} />
        </div>

        <div style={{ textAlign: "center", fontWeight: "800" }}>
          <CopyToClipboardButton url={qrUrl} />
          <Button onClick={() => { window.open(qrUrl, '_blank') }}>Open in Reclaim App</Button>
        </div>
        
      </Box>
    </Modal>
  </div>

  <h1 className={styles.title}>
    Zero Knowledge <span style={{ color: "#1E9CEA" }}>Twitter</span> Message Proof
  </h1>

  <div className={styles.grid}>
    <div onKeyDown={onEnter}>
      <p style={{ textAlign: "center", fontWeight: "700" }}>
        Enter Twitter usernames you want to prove you had a conversation with separated by commas  👇
      </p>

      <Box width={1}>
        <TextField
        onChange={updateUsername}
          id="outlined-multiline-flexible"
          label="@username, @username, @username.."
          multiline
          fullWidth
        />
      </Box>
      {/* <div style={{ textAlign: "center", fontWeight: "800", marginTop: '20px' }}> */}
      <div style={{ textAlign: "center", fontWeight: "800" , marginTop: '20px' }}>
        <Button
          variant="contained"
          sx={{
            height: '50px',
            backgroundColor: '#1E9CEA',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: "#1E9CEA",
            },
          }}
          onClick={onSubmit}
        >
          Prove and submit on-chain
        </Button>
      </div>

      
    
    </div>
  </div>
</main>

      <footer>
        <a
          href="https://www.reclaimprotocol.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          We used Reclaim Protocol to generate zero knowledge proofs of personhood based on your twitter conversations{'  '} to
          <img src="/logo.png" alt="logo" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
