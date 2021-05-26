import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions } from '@material-ui/core';
import { DialogContent, DialogTitle } from '@material-ui/core';

import imageApi from '../api/image';
import { getImgFromBuff } from '../imageHelper';

export default function ShowImageDialog({ data, handleClose }) {
  const [img, setImg] = useState(null);

  const getImage = async () => {
    const res = await imageApi.getImageById(data.id);
    if (res.ok) {
      const pic = getImgFromBuff(res.data.file.data, data.type);
      setImg(pic);
    }
  };
  useEffect(() => {
    getImage();
    // eslint-disable-next-line
  }, []);

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>{data.name}</DialogTitle>
      <DialogContent>
        <img src={img} alt={''} style={{ height: '100%', width: '100%' }}></img>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
