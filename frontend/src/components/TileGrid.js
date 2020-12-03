import React from "react";
import { GridList, GridListTile, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    imgFullHeight: "true",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

// Generates tilesData

function populateTiles() {
  const tilesData = [];
  // var types = ["bamboo","tong","wan"]
  var types = ["tong"];
  types.forEach((element) => {
    for (var i = 1; i <= 9; i++) {
      var obj = {};
      obj["img"] = "assets/" + element + "-" + i + ".png";
      obj["id"] = element + i;
      tilesData.push(obj);
    }
  });
  return tilesData;
}


export default function TileGrid() {
  const styles = useStyles;
  var tilesData = populateTiles();
  return (
    <div>
      <GridList cellHeight={180} cols={9} style={styles.gridList}>
        {tilesData.map((tile, index) => (
          <GridListTile>
            key={tile.id}
            cols={index % 9}
            <Button
              variant="outlined"
              onClick={() => {
                alert(tile.id);
              }}
            >
              <img src={tile.img} />
            </Button>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

