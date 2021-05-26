import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { TableContainer, TableHead, Paper } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';

import imageApi from '../api/image';
import TileImage from './TileImage';
import { getSize } from '../imageHelper';

export default function CTable({ data, delPic, handleShowImage }) {
  const handleDelete = async (name, id) => {
    delPic(name);
    await imageApi.deleteImage(id);
  };

  return (
    <TableContainer component={Paper}>
      <Table style={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell align="right">Uploded</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Dimension</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Thumbnail</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">
                {new Date(row.uploaded).toLocaleString()}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.dimension}</TableCell>
              <TableCell align="right">{getSize(row.size)}</TableCell>
              <TableCell align="right">
                <div style={{ height: 100, width: 100 }}>
                  <TileImage src={row.thumbnail} />
                </div>
              </TableCell>
              <TableCell align="right">
                <ButtonGroup
                  orientation="vertical"
                  color="primary"
                  variant="text"
                >
                  <Button onClick={() => handleDelete(row.name, row.id)}>
                    Delete
                  </Button>
                  <Button
                    onClick={() => handleShowImage(row.name, row.id, row.type)}
                  >
                    Show
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
