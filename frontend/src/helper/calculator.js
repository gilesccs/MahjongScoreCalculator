//Current wind
// Hai di lao
// Hua shang
// Qiang gang 
// 7 dui zi zimo → tai
// 7 dui zi feed → tai 

// Compute tai
// Compute by combinations (fixed set)
// Ping hu
// Cou ping hu
// Pong pong hu
// 13 yao
// 7 dui zi
// Qing yi se
// Ban se
// Da si xi
// Xiao si xi
// Siao san yuan
// Da san yuan 
// 1 9
// ½ 1 9 -> 4 tai
// SIAO SAN GONG/ZA HU(FAIL)
// Show breakdown -> which tiles give which tai
// const alltiles = ["t1","t2","t3","t4","t5","t6","t7","t8","t9","w1","w2","w3","w4","w5","w6","w7","w8","w9","b1","b2","b3","b4","b5","b6","b7","b8","b9","f1","f2","f3","f4","f5","f6","f7","f8","dong","nan","xi","bei","zhong","fa","baiban","a1","a2","a3","a4"];
let currenttiles = ["dong","nan","bei","dong","nan","bei","dong","nan","bei","xi","xi","xi"];
let currentflowers = ["f1","a1"];
let currentwind = 1;
let ownwind = 3;
let haidilao = true;
let huashang = true;
let qg = true;
let sevenzimo = false;
let sevenshoot = false;
let pinghustate = false;

function countOccurence(tile,currenttiles){
  let count = 0;
  

  for(let i =0; i<currenttiles.length; i++){
    let currenttile = currenttiles[i];
    if(currenttile == tile){
      count +=1;
    }
  }

  return count;
}

function calculateTai(currenttiles, currentflowers, currentwind, haidilao, huashang, qg, sevenzimo, pinghustate) {
  let result = {tai:0,pattern:[]};
  let pingstartstate;
  if(pinghustate){
    pingstartstate = true;
  }

  //check animals
  for(let i =0; i<currentflowers.length; i++){
    let currenttile = currentflowers[i];
    if(currenttile.charAt(0) == 'a'){
      result.tai += 1;
      if(currenttile.charAt(1) == '1') result.pattern.push(currenttile + "- cat 1 tai");
      if(currenttile.charAt(1) == '2') result.pattern.push(currenttile + "- rat 1 tai");
      if(currenttile.charAt(1) == '3') result.pattern.push(currenttile + "- rooster 1 tai");
      if(currenttile.charAt(1) == '4') result.pattern.push(currenttile + "- centipede 1 tai");
      pinghustate = false;
    }
  }
  //check flowers 
  let tempflower = [];
  let temp = ownwind + 4;
  for(let i =0; i<currentflowers.length; i++){
    let currenttile = currentflowers[i];
    if(currenttile.charAt(0) == 'f' && currenttile != 'fa'){
      tempflower.push(currenttile);
      pinghustate = false;
      if(currenttile.charAt(1) == ownwind || currenttile.charAt(1) == temp){
        result.tai+= 1;
        result.pattern.push(currenttile + "- own flower 1 tai");
      }
    }
  }
  let flower1 = ["f1","f2","f3","f4"];
  let flower2 = ["f5","f6","f7","f8"];
  function checkAllFlowers(ownflowers, flowerarray){
    let state = true;
    for(let i =0; i<flowerarray.length; i++){
      if(!ownflowers.includes(flowerarray[i])){
        state = false;
      }
    }
    return state;
  }
  if(checkAllFlowers(tempflower,flower1)){
    result.tai+= 1;
  }
  if(checkAllFlowers(tempflower,flower2)){
    result.tai+= 1;
  }

  //check big tiles
  if(countOccurence("zhong",currenttiles) >= 3){
    result.tai+= 1;
  }
  if(countOccurence("baiban",currenttiles) >= 3){
    result.tai+= 1;
  }
  if(countOccurence("fa",currenttiles) >= 3){
    result.tai+= 1;
  }

  switch(currentwind) {
    case 1:
      if(countOccurence("dong",currenttiles) >= 3){
        result.tai+= 1;
      }
      break;
    case 2:
      if(countOccurence("nan",currenttiles) >= 3){
        result.tai+= 1;
      }
      // code block
      break;
    case 3:
      if(countOccurence("xi",currenttiles) >= 3){
        result.tai+= 1;
      }
      break;
    case 4:
      if(countOccurence("bei",currenttiles) >= 3){
        result.tai+= 1;
      }
      break;
  }
  
  //check own feng
  switch(ownwind){
    case 1:
      if(countOccurence("dong",currenttiles) >= 3){
        result.tai+= 1;
      }
      break;
    case 2:
      if(countOccurence("nan",currenttiles) >= 3){
        result.tai+= 1;
      }
      // code block
      break;
    case 3:
      if(countOccurence("xi",currenttiles) >= 3){
        result.tai+= 1;
      }
      break;
    case 4:
      if(countOccurence("bei",currenttiles) >= 3){
        result.tai+= 1;
      }
      break;
  }

  // Ping hu
  // Cou ping hu
  // Pong pong hu
  // 13 yao
  // 7 dui zi
  // Qing yi se
  // Ban se
  // Da si xi
  // Xiao si xi
  // Siao san yuan
  // Da san yuan 
  // 1 9
  // ½ 1 9 -> 4 tai
  // SIAO SAN GONG/ZA HU(FAIL)

  // Ping hu
  let isPingHu = true;
  //check whether there's >= 3 of same tiles.
  const consecutiveTiles = ["t1","t2","t3","t4","t5","t6","t7","t8","t9","w1","w2","w3","w4","w5","w6","w7","w8","w9","b1","b2","b3","b4","b5","b6","b7","b8","b9"];
  for(let i =0; i<currenttiles.length; i++){
    let currenttile = currenttiles[i];
    if(countOccurence(currenttile,currenttiles) >= 3){
      isPingHu = false;
      break;
    }
  }
  function removeTile(tile, currenttiles){
    let index = currenttiles.indexOf(tile);
    if (index >= 0) {
      currenttiles.splice( index, 1 );
    }
  }
  // if no, check consecutive
  // if(isPingHu){
  //   let currenttilescopy = [];
  //   for(let i =0; i<currenttiles.length; i++){
  //     currenttilescopy[i]=currenttiles[i];
  //   }
  //   for(let i =0; i<currenttilescopy.length; i++){
  //     let currenttile = currenttilescopy[i];
  //     if(consecutiveTiles.includes(currenttile)){
  //       if(currenttile == "t1"){
  //         if(consecutiveTiles.includes("t2") && consecutiveTiles.includes("t3")){
  //           removeTile("t1",currenttilescopy);
  //           removeTile("t2",currenttilescopy);
  //           removeTile("t3",currenttilescopy);
  //         }
  //       }
  //     }  
  //   }
  //   for(let i =0; i<currenttilescopy.length; i++){
  //     let currenttile = currenttilescopy[i];
  //     if(consecutiveTiles.includes(currenttile)){
  //       if(currenttile == "t9"){
  //         if(consecutiveTiles.includes("t8") && consecutiveTiles.includes("t7")){
  //           removeTile("t7",currenttilescopy);
  //           removeTile("t8",currenttilescopy);
  //           removeTile("t9",currenttilescopy);
  //         }
  //       }
  //     }  
  //   }
  //   for(let i =0; i<currenttilescopy.length; i++){
  //     let currenttile = currenttilescopy[i];
  //     if(consecutiveTiles.includes(currenttile)){
  //       if(currenttile == "w1"){
  //         if(consecutiveTiles.includes("w2") && consecutiveTiles.includes("w3")){
  //           removeTile("w1",currenttilescopy);
  //           removeTile("w2",currenttilescopy);
  //           removeTile("w3",currenttilescopy);
  //         }
  //       }
  //     }  
  //   }
  //   for(let i =0; i<currenttilescopy.length; i++){
  //     let currenttile = currenttilescopy[i];
  //     if(consecutiveTiles.includes(currenttile)){
  //       if(currenttile == "w9"){
  //         if(consecutiveTiles.includes("w8") && consecutiveTiles.includes("w7")){
  //           removeTile("w7",currenttilescopy);
  //           removeTile("w8",currenttilescopy);
  //           removeTile("w9",currenttilescopy);
  //         }
  //       }
  //     }  
  //   }

  //   for(let i =0; i<currenttilescopy.length; i++){
  //     let currenttile = currenttilescopy[i];
  //     if(consecutiveTiles.includes(currenttile)){
  //       if(currenttile == "b1"){
  //         if(consecutiveTiles.includes("b2") && consecutiveTiles.includes("b3")){
  //           removeTile("b1",currenttilescopy);
  //           removeTile("b2",currenttilescopy);
  //           removeTile("b3",currenttilescopy);
  //         }
  //       }
  //     }  
  //   }
  //   for(let i =0; i<currenttilescopy.length; i++){
  //     let currenttile = currenttilescopy[i];
  //     if(consecutiveTiles.includes(currenttile)){
  //       if(currenttile == "b9"){
  //         if(consecutiveTiles.includes("b8") && consecutiveTiles.includes("b7")){
  //           removeTile("b7",currenttilescopy);
  //           removeTile("b8",currenttilescopy);
  //           removeTile("b9",currenttilescopy);
  //         }
  //       }
  //     }  
  //   }


  // }

  // Pong pong hu
  //check yanjing
  let pongstate = true;
  let eyearr = [];
  let tripletarr = [];
  for(let i =0; i<currenttiles.length; i++){
    let currenttile = currenttiles[i];
    if(countOccurence(currenttile,currenttiles) == 2){
      eyearr.push(currenttile);
    }else if(countOccurence(currenttile,currenttiles) == 3){
      tripletarr.push(currenttile);
    }
  }

  if(eyearr.length != 2){
    pongstate = false;
  }

  if(tripletarr.length != 12){
    pongstate = false;
  }

  if(pongstate){
    console.log("pong");
    result.tai+=2;
  }

  //13yao;
  // const alltiles = ["t1","t2","t3","t4","t5","t6","t7","t8","t9","w1","w2","w3","w4","w5","w6","w7","w8","w9","b1","b2","b3","b4","b5","b6","b7","b8","b9","f1","f2","f3","f4","f5","f6","f7","f8","dong","nan","xi","bei","zhong","fa","baiban","a1","a2","a3","a4"];
  //"dong","nan","xi","bei","zhong","fa","baiban", "t1", "t9", "w1", "w9", "b1", "b9", "anything"
  const requiredList = ["dong","nan","xi","bei","zhong","fa","baiban", "t1", "t9", "w1", "w9", "b1", "b9"];
  let yao13 = true;
  for(let i =0; i<requiredList.length; i++){
    let requiredTile = requiredList[i];
    if(!currenttiles.includes(requiredTile)){
      yao13 = false;
      break;
    }
  }

  if(eyearr.length != 2){
    yao13 = false;
  }

  if(yao13){
    console.log("13yao");
    result.tai+= 5;
  }

  // 7 dui zi
  let sevenstate = true;
  for(let i =0; i<currenttiles.length; i++){
    let currenttile = currenttiles[i];
    if(countOccurence(currenttile,currenttiles) != 2){
      sevenstate = false;
      // console.log("yes");
    }
  }
  if(sevenstate){
    if(sevenzimo){
      result.tai += 5;
      console.log("7pair");
    }else{
      console.log("7pair");
      result.tai += 2;
    }
  }
  //Qing yi se
  let onecolor = true;
  let color = currenttiles[0].charAt(0);
  for(let i =0; i<currenttiles.length; i++){
    let currenttile = currenttiles[i];
    if(currenttile.charAt(0) != color){
      onecolor = false;
    }
  }
  if(onecolor){
    console.log("yi se");
    result.tai += 4;
  }
  //check dapai one color
  onecolor = true;
  let dapaieyearr = []
  const dapai = ["dong","nan","xi","bei","zhong","fa","baiban"];
  for(let i =0; i<currenttiles.length; i++){
    let currenttile = currenttiles[i];
    if(countOccurence(currenttile,currenttiles) < 2 || !dapai.includes(currenttile)){
      onecolor = false;
    }else if (countOccurence(currenttile,currenttiles) == 2 && dapai.includes(currenttile)){
      dapaieyearr.push(currenttile);
    }
  }

  if(dapaieyearr.length != 2 && dapaieyearr.length != 0){
    onecolor = false;
  }
  if(onecolor){
    console.log("yi se");
    result.tai += 4;
  }

  // Ban se
  let firsttime = true;
  let halfcolor = true;
  
  for(let i =0; i<currenttiles.length; i++){
    let currenttile = currenttiles[i];
    if(dapai.includes(currenttile)){
      continue;
    }else{
      if(firsttime){
        onecolor = currenttile.charAt(0);
        firsttime = false;
      }else{
        if(currenttile.charAt(0) != color){
          halfcolor = false;
        }
      }
    }
  }
  if(halfcolor && !onecolor){
    console.log("banse");
    result.tai+= 2;
  }
  // Da si xi
  let winds = ["dong","nan","xi","bei"];
  let dasixi = true;
  let dasixicounter = 0;
  for(let i =0; i<currenttiles.length; i++){
    let currenttile = currenttiles[i];
    if(winds.includes(currenttile)){
      dasixicounter++;
      if(countOccurence(currenttile,currenttiles) != 3){
        dasixi = false;
      }
    }else{
      dasixi = false;
    }
  }
  if(dasixicounter<12){
    dasixi =false;
  }
  if(dasixi){
    console.log("dasixi");
    result.tai+=5;
  }
  // Xiao si xi
  let xiaosixi = true;
  let xiaosixiarr = [];
  let xiaosixicounter = 0;
  for(let i =0; i<currenttiles.length; i++){
    let currenttile = currenttiles[i];
    if(winds.includes(currenttile)){
      xiaosixicounter++;
      if(countOccurence(currenttile,currenttiles) == 2){
        xiaosixiarr.push(currenttile);
      }else if(countOccurence(currenttile,currenttiles) != 3){
        xiaosixi = false;
      }
    }
  }
  if(xiaosixicounter<11){
    xiaosixi = false;
  }
  if(xiaosixiarr.length != 2){
    xiaosixi = false;
  }
  if(xiaosixi){
    console.log("xsi");
    result.tai += 2;
  }
  // da san yuan
  const dsypai = ["zhong","fa","baiban"];
  let dsy = true;
  for(let i =0; i<dsypai.length; i++){
    let currenttile = dsypai[i];
    if(countOccurence(currenttile, currenttiles) != 3){
      dsy = false;
    }
  }
  if(dsy){
    console.log("dsy");
    result.tai += 5;
  }
  // siao san yuan 
  let ssy = true;
  let ssyyanjing = 0;
  for(let i =0; i<dsypai.length; i++){
    let currenttile = dsypai[i];
    if(countOccurence(currenttile, currenttiles) < 2){
      ssy = false;
    }else if(countOccurence(currenttile, currenttiles) == 2){
      if(ssyyanjing<=2){
        ssyyanjing += 1;
      }else{
        ssy = false;
      }
    }
  }
  if(ssy){
    console.log("ssy");
    result.tai += 3;
  }
  // 1 9
  const onenine = ["w1","w9","t1","t9","b1","b9"];
  let oneninestate = true;
  let oneninearr = [];
  for(let i =0; i<currenttiles.length; i++){
    let currenttile = currenttiles[i];
    if(onenine.includes(currenttile)){
      if(countOccurence(currenttile,currenttiles) == 2){
        oneninearr.push(currenttile);
      }else if(countOccurence(currenttile,currenttiles) != 3){
        oneninestate = false;
      }
    }
  }

  if(oneninearr.length != 2 ){
    oneninestate = false;
  }

  if(oneninestate){
    console.log("oneninestate");
    result.tai+= 5;
  }


  // ½ 1 9 -> 2 tai
  let halfoneninestate = true;
  const halfnine = ["w1","w9","t1","t9","b1","b9"];
  let halfninearr = [];
  if(oneninestate == false){

    for(let i =0; i<currenttiles.length; i++){
      let currenttile = currenttiles[i];
      if(halfnine.includes(currenttile)){
        if(countOccurence(currenttile,currenttiles) == 2){
          halfninearr.push(currenttile);
        }else if(countOccurence(currenttile,currenttiles) != 3){
          halfoneninestate = false;
        }
      }
    }

    if(halfninearr.length != 2 ){
      halfoneninestate = false;
    }
  
    if(halfoneninestate){
      console.log("halfoneninestate");
      result.tai+= 2;
    }

  }
  if(result.tai>0){
    if(haidilao){
      result.tai+=1;
    }

    if(qg){
      result.tai+=1;
    }

    if(pinghustate){
      result.tai+=4;
    }else if(pingstartstate){
      result.tai+=1;
    }

    if(huashang){
      result.tai+=1;
    }
  }
  
  return result;
}

console.log(calculateTai(currenttiles, currentflowers, currentwind, haidilao, huashang, qg, sevenzimo, sevenshoot));